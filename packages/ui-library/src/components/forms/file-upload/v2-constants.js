/**
 * @enum {string}
 * @alias FileUpload.ErrorCodes
 */
exports.ErrorCodes = {
    /** file is too big */
    TOO_BIG: "fileupload.error.size",
    /** file is the wrong type */
    WRONG_MIME_TYPE: "fileupload.error.type",
    /** file cannot be read */
    CANT_READ: "fileupload.error.read"
};

exports.Accept = {
    IMAGE: "image/jpeg, image/jpg, image/gif, image/png",
    TEXT: "text/html, text/*"
};
