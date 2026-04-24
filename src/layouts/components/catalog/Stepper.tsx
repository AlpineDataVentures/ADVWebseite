import { cn } from "../lib/utils";

interface StepperProps {
  currentStep: number;
  steps: string[];
  className?: string;
}

export default function Stepper({ currentStep, steps, className }: StepperProps) {
  return (
    <div className={cn("flex items-center justify-between mb-8", className)}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        
        return (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  {
                    "bg-green-600 text-white border-green-600": isActive,
                    "bg-green-500/10 text-green-600 dark:text-green-400 border-green-600 dark:border-green-400": isCompleted,
                    "bg-body dark:bg-darkmode-body text-text-light dark:text-darkmode-text-light border-border dark:border-darkmode-border": !isActive && !isCompleted,
                  }
                )}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium",
                  {
                    "text-green-600 dark:text-green-400": isActive,
                    "text-text-light dark:text-darkmode-text-light": !isActive && !isCompleted,
                    "text-text dark:text-darkmode-text": isCompleted,
                  }
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4",
                  {
                    "bg-green-600": isCompleted,
                    "bg-border dark:bg-darkmode-border": !isCompleted,
                  }
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
