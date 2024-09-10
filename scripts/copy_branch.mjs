import { copyFile, unlink } from 'fs';

// File destination.txt will be created or overwritten by default.
copyFile('./public/robot_branch.txt', 'dist/robots.txt', (err) => {
  if (err) throw err;
  console.log('./public/robot_branch.txt was copied to dist/robots.txt');
});
unlink('./public/robot_branch.txt', (err) => {
  if (err) throw err;
  console.log('./public/robot_branch.txt was deleted');
});
unlink('./public/robot_prod.txt', (err) => {
  if (err) throw err;
  console.log('./public/robot_prod.txt was deleted');
});
