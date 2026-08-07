import { Request, Response } from "express";
import { Business } from "../models/business";
import { getPublicId } from "../utils";
import { v4 as uuid } from 'uuid';
import cloudinary from "../config/cloudinary";

const MAX_BUSINESS = 3;
export class BusinessController {
    static getBusiness = async (req: Request, res: Response) => {
        try {
            return res.status(200).json(req.businesses);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    static getBusinessById = async (req: Request, res: Response) => {
        try {
            return res.status(200).json(req.business);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    static createBusiness = async (req: Request, res: Response) => {
        const { _id } = req.user._id;
        const { name, slug, description, email, phone } = req.body;
        const { linkedin, facebook, instagram } = req.body.socialMedia;
        try {
            const existBusiness = await Business.countDocuments({ owner: _id });
            if (MAX_BUSINESS <= existBusiness) {
                const error = new Error(`No puedes crear mas de ${MAX_BUSINESS} negocios, actualiza tu plan o elimina alguno.`);
                return res.status(400).json({ message: error.message });
            }
            const business = new Business({ name, slug, description, email, phone, owner: _id, socialMedia: { linkedin, facebook, instagram }, logo: '', coverImage: '', });
            await business.save();
            res.status(201).json({ message: 'Negocio creado correctamente' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static updateBusiness = async (req: Request, res: Response) => {
        const business = req.business;
        const { name, slug, description, email, phone, socialMedia } = req.body;
        try {
            business.name = name || business.name;
            business.slug = slug || business.slug;
            business.description = description || business.description;
            business.email = email || business.email;
            business.phone = phone || business.phone;
            business.socialMedia = business.socialMedia || socialMedia;
            await business.save();
            res.status(200).json({ message: 'Negocio actualizado correctamente' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // TODO: We must eliminate all possible branches within this business, as well as all menus and everything related to the branches, menus, promotions, etc.
    // TODO: Right now, you can delete the business itself, but the information about the branches associated with that business still remains.
    static deleteBusiness = async (req: Request, res: Response) => {
        const business = req.business;
        try {
            await business.deleteOne();
            res.status(200).json({ message: 'Negocio eliminado correctamente' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    static uploadLogo = async (req: Request, res: Response) => {
        const business = req.business;
        try {
            const file = Array.isArray(req.files.image)
                ? req.files.image[0]
                : req.files.image;

            if (!file) {
                const error = new Error('Debes subir una imagen.');
                return res.status(400).json({ message: error.message });
            }

            if (business.logo) {
                try {
                    const publicId = getPublicId(business.logo);
                    await cloudinary.uploader.destroy(publicId);
                } catch (error) {
                    console.log('Error deleting previous logo:', error);
                }
            }

            const result = await cloudinary.uploader.upload(file.filepath, {
                public_id: uuid(),
                folder: 'businesses/logos',
            })

            business.logo = result.secure_url;
            await business.save();
            res.status(200).json({ message: 'Logo actualizado correctamente' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static uploadCover = async (req: Request, res: Response) => {
        const business = req.business;
        try {
            const file = Array.isArray(req.files.image)
                ? req.files.image[0]
                : req.files.image;

            if (!file) {
                const error = new Error('Debes subir una imagen.');
                return res.status(400).json({ message: error.message });
            }

            if (business.coverImage) {
                try {
                    const publicId = getPublicId(business.coverImage);
                    await cloudinary.uploader.destroy(publicId);
                } catch (error) {
                    console.log('Error deleting previous logo:', error);
                }
            }

            const result = await cloudinary.uploader.upload(file.filepath, {
                public_id: uuid(),
                folder: 'businesses/covers',
            })

            business.coverImage = result.secure_url;
            await business.save();
            res.status(200).json({ message: 'Cover actualizado correctamente' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}