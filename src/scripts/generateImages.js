import fs from 'fs';
import path from 'path';


// This function reads the directory and generates a list of images
const getImages = (folderName) => {
  const publicFolder = path.resolve('./public');
  const imageFolder = path.join(publicFolder, folderName);
  
  // Check if the folder exists before reading
  if (!fs.existsSync(imageFolder)) {
    console.error(`Folder ${folderName} does not exist.`);
    return []; // Return an empty array if the folder doesn't exist
  }
  
  const files = fs.readdirSync(imageFolder);
  return files.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/.test(file));
};

// const images = getImages();
// console.log(images); // Or export this list to use in your Astro component

// Export the function to be used in other parts of the project
export { getImages };