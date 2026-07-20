import bcrypt from 'bcrypt';

export const hashPassword = async(password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const checkPassword = async (enteredPassword: string, hashedPassword: string) : Promise<boolean> => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
}

export const getPublicId = (url: string) => {
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return null;
  let publicId = url.substring(uploadIndex + 8);
  if (publicId.startsWith('v')) {
    publicId = publicId.substring(publicId.indexOf('/') + 1);
  }
  return publicId.replace(/\.[^/.]+$/, '');
};