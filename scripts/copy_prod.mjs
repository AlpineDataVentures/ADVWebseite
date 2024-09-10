import { copyFile } from 'fs';

// File destination.txt will be created or overwritten by default.
copyFile('./public/robot_prod.txt', 'dist/robots.txt', (err) => {
  if (err) throw err;
  console.log('./public/robot_prod.txt was copied to dist/robots.txt');
});
