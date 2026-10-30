import { useState } from "react";
import { CALENDLY_URL } from "./settings";

type ReportingCheckData = {
  eyebrow: string;
  title: string;
  lead: string;
  steps: string[];
  questions: { q: string; options: { label: string; points: number }[] }[];
  maxScore: number;
  results: {
    min: number;
    level: number;
    title: string;
    text: string;
    recommendation: string;
    why: string;
  }[];
  labels: Record<string, string>;
};

const inputClass =
  "w-full rounded border border-border bg-body px-3 py-2.5 font-secondary text-base text-text-dark focus:border-[#00CE7E] focus:ring-[#00CE7E] dark:border-darkmode-border dark:bg-darkmode-body dark:text-darkmode-text-dark";

const mutedClass =
  "font-secondary text-base text-text-light dark:text-darkmode-text-light";

const linkButtonClass =
  "font-secondary text-sm font-semibold text-[#008a55] hover:underline dark:text-[#00CE7E]";

const pushEvent = (event: string, data?: Record<string, unknown>) => {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  (w.dataLayer = w.dataLayer || []).push({ event, ...data });
};

function ProgressBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="flex items-center justify-between gap-4 font-secondary text-sm text-text-light dark:text-darkmode-text-light">
      <span>{label}</span>
      <span className="h-1.5 w-32 overflow-hidden rounded-full bg-border dark:bg-darkmode-border">
        <i
          className="block h-full bg-[#00CE7E] transition-all"
          style={{ width: `${percent}%` }}
        />
      </span>
    </div>
  );
}

export default function ReportingCheckQuiz({
  reportingCheck,
}: {
  reportingCheck: ReportingCheckData;
}) {
  const { questions, results, labels, maxScore } = reportingCheck;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const finished = step >= questions.length;
  const score = answers.reduce((sum, points) => sum + points, 0);
  const result = [...results].reverse().find((r) => score >= r.min);

  const answer = (points: number, label: string) => {
    if (step === 0) pushEvent("quiz_start");
    const next = [...answers];
    next[step] = points;
    setAnswers(next);
    const nextSelectedAnswers = [...selectedAnswers];
    nextSelectedAnswers[step] = label;
    setSelectedAnswers(nextSelectedAnswers);
    setStep(step + 1);
    if (step + 1 === questions.length) {
      pushEvent("quiz_complete", {
        score: next.reduce((sum, p) => sum + p, 0),
      });
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setSelectedAnswers([]);
    setStatus("idle");
  };

  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const [firstname, ...rest] = String(data.get("name")).trim().split(/\s+/);
    setStatus("sending");
    try {
      const response = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname: rest.join(" ") || "-",
          email: data.get("email"),
          reason: "Reporting-Check online",
          website: "",
          message: [
            `Auswertung angefordert: ${score} von ${maxScore} Punkten (${result?.title}).`,
            "",
            "Ausgewählte Antworten:",
            ...questions.map(
              (question, index) =>
                `${index + 1}. ${question.q}\n   ${selectedAnswers[index]}`,
            ),
          ].join("\n"),
        }),
      });
      if (!response.ok) throw new Error();
      pushEvent("lead", { source: "quiz" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      aria-live="polite"
      className="grid min-w-0 gap-6 rounded-lg border border-border bg-body p-6 dark:border-darkmode-border dark:bg-darkmode-body md:p-8"
    >
      {!finished ? (
        <>
          <ProgressBar
            label={`${labels.question} ${step + 1} ${labels.of} ${questions.length}`}
            percent={(step / questions.length) * 100}
          />
          <h3 className="font-primary text-h4 font-bold text-text-dark dark:text-darkmode-text-dark">
            {questions[step].q}
          </h3>
          <div className="grid gap-3">
            {questions[step].options.map((option) => {
              const selected = answers[step] === option.points;
              return (
                <button
                  key={option.label}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => answer(option.points, option.label)}
                  className="group flex items-center gap-3 rounded-md border border-border px-4 py-3 text-left font-secondary text-base text-text-dark transition hover:border-[#00CE7E] hover:bg-light dark:border-darkmode-border dark:text-darkmode-text-dark dark:hover:bg-darkmode-light"
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition group-hover:border-[#00CE7E] ${
                      selected
                        ? "border-[#00CE7E]"
                        : "border-[#b4afb6]"
                    }`}
                  >
                    {selected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-[#00CE7E]" />
                    )}
                  </span>
                  {option.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            {step > 0 ? (
              <button
                type="button"
                className={linkButtonClass}
                onClick={() => setStep(step - 1)}
              >
                {labels.back}
              </button>
            ) : (
              <span />
            )}
            <span className="font-secondary text-sm text-text-light dark:text-darkmode-text-light">
              {labels.duration}
            </span>
          </div>
        </>
      ) : (
        result && (
          <>
            <ProgressBar label={labels.result} percent={100} />
            <div>
              <b className="font-primary text-5xl font-bold text-[#008a55] dark:text-[#00CE7E]">
                {score}
              </b>{" "}
              <span className={mutedClass}>
                {labels.points} · {result.title}
              </span>
            </div>
            <div className="flex gap-1.5" aria-hidden="true">
              {[1, 2, 3].map((i) => (
                <i
                  key={i}
                  className={`h-2 flex-1 rounded-full ${
                    i <= result.level
                      ? "bg-[#00CE7E]"
                      : "bg-border dark:bg-darkmode-border"
                  }`}
                />
              ))}
            </div>
            <p className={mutedClass}>{result.text}</p>
            <div className="rounded-md border-l-2 border-[#00CE7E] bg-light p-4 font-secondary text-base text-text dark:bg-darkmode-light dark:text-darkmode-text-light">
              <b className="block text-text-dark dark:text-darkmode-text-dark">
                {result.recommendation}
              </b>
              {result.why}
            </div>

            {status === "sent" ? (
              <p className="font-secondary text-base font-bold text-[#008a55] dark:text-[#00CE7E]">
                {labels.success}
              </p>
            ) : (
              <form
                onSubmit={submit}
                className="grid gap-3 border-t border-border pt-5 dark:border-darkmode-border"
              >
                <p className="font-secondary text-base font-semibold text-text-dark dark:text-darkmode-text-dark">
                  {labels.formTitle}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className={inputClass}
                    name="name"
                    placeholder={labels.namePlaceholder}
                    required
                    maxLength={200}
                    autoComplete="name"
                  />
                  <input
                    className={inputClass}
                    name="email"
                    type="email"
                    placeholder={labels.emailPlaceholder}
                    required
                    autoComplete="email"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="justify-self-start rounded-md border border-[#00CE7E] bg-[#00CE7E] px-6 py-3 font-secondary text-base font-bold text-black transition hover:opacity-90 disabled:opacity-50"
                >
                  {labels.submit}
                </button>
                <small className="font-secondary text-sm text-text-light dark:text-darkmode-text-light">
                  {labels.privacy}{" "}
                  <a href="/datenschutz/" className="underline">
                    {labels.privacyLink}
                  </a>
                </small>
                {status === "error" && (
                  <small role="alert" className="font-secondary text-sm text-[#c0392b] dark:text-[#ff8a7a]">
                    {labels.error}
                  </small>
                )}
              </form>
            )}

            <div className="flex items-center justify-between">
              <button type="button" className={linkButtonClass} onClick={restart}>
                {labels.restart}
              </button>
              <a href={CALENDLY_URL} className={linkButtonClass}>
                {labels.talk}
              </a>
            </div>
          </>
        )
      )}
    </div>
  );
}
