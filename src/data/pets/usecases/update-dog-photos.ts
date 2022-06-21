/* eslint-disable @typescript-eslint/no-explicit-any */

import { UploadPetPhotos } from '../../../domain/pets/upload-dog-photos';
import { IPetsRepository } from '../../protocols/pets-repository';
import AppError from '../../../errors/AppError';
import { Storage } from '../../protocols/storage';

interface Request {
  userId: string
  petName: string,
  filenames: string[]
}

interface Photo {
  imgId: string;
  url: string
}
class UploadPetPhotosUseCase implements UploadPetPhotos {
  private readonly repository;

  private readonly storage;

  constructor(repository: IPetsRepository, storage: Storage) {
    this.storage = storage;
    this.repository = repository;
  }

  public async upload({ userId, petName, filenames }: Request): Promise<Photo[]> {
    // Query para achar todos os cachorros daquele usuario
    const dogs = await this.repository.findUserPets(userId);
    if (!dogs) {
      throw new AppError('This user have no dogs registerd');
    }
    const selectedDog = dogs.find((pet) => pet.name === petName);

    if (!selectedDog) {
      throw new AppError('Dog with this name was not Found');
    }
    const uploadedFiles = await this.storage.uploadMultipleFiles(filenames, 'dogs');
    const photos = await this.repository.updatePetPhotos(selectedDog, uploadedFiles);
    return photos;
  }
}
export default UploadPetPhotosUseCase;