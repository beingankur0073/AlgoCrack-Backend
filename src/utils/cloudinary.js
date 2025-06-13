import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'; // For file system operations (unlinking local files)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a local file to Cloudinary.
 *
 * @param {string} localFilePath The absolute path to the local file.
 * @returns {Promise<Object|null>} A promise that resolves to the Cloudinary response object if successful, otherwise null.
 */
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("Local file path not provided.");
            return null;
        }

        // Upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically determines resource type (image, video, raw)
        });

        // File has been uploaded successfully
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file after upload
        console.log("File is uploaded on Cloudinary:", response.url);
        return response;

    } catch (error) {
        console.error("Cloudinary upload failed:", error.message);
        // Remove the locally saved temporary file even if the upload operation fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

/**
 * Extracts the public ID from a Cloudinary URL.
 * This public ID is needed to delete the file from Cloudinary.
 *
 * @param {string} url The full Cloudinary URL of the asset.
 * @returns {string|null} The public ID of the asset, or null if it cannot be extracted.
 */
const getPublicIdFromCloudinaryUrl = (url) => {
    if (!url || typeof url !== 'string') {
        return null;
    }
    // Regex to extract the public_id from the URL.
    // It looks for the part after '/upload/v<version_number>/' and before the file extension.
    // Examples:
    // https://res.cloudinary.com/demo/image/upload/v1234567890/myfolder/myimage.jpg -> myfolder/myimage
    // https://res.cloudinary.com/demo/video/upload/v1234567890/video_clip.mp4 -> video_clip
    const match = url.match(/\/v\d+\/(.+?)(?:\.\w+)?$/);
    if (match && match[1]) {
        return match[1];
    }
    return null;
};


/**
 * Deletes a file from Cloudinary using its public ID.
 *
 * @param {string} publicId The public ID of the asset to delete.
 * @param {string} [resourceType='image'] The type of resource to delete (e.g., 'image', 'video', 'raw').
 * @returns {Promise<Object|null>} A promise that resolves to the Cloudinary deletion response, or null on error.
 */
const deleteFromCloudinary = async (publicId, resourceType = "image") => {
    try {
        if (!publicId) {
            console.log("Public ID not provided for deletion.");
            return null;
        }

        // Call Cloudinary's destroy method
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType // Specify resource type for proper deletion
        });

        console.log(`Cloudinary deletion response for ${publicId}:`, response);
        // Response will typically be { result: "ok" } for success
        return response;
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error.message);
        return null;
    }
};


export {
    uploadOnCloudinary,
    deleteFromCloudinary,
    getPublicIdFromCloudinaryUrl
};