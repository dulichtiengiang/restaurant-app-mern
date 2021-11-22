const multer = require("multer");

const storage = multer.diskStorage({
    //! destination: The folder to which the file has been saved
    destination: function (req, file, cb) {
        cb(null, "uploads"); //! uploads as the folder that i want all my Images to be stored im my file system.
    },
    //! filename that multer to name our files (images) are uploaded on the FrontEnd
    //! filename: The name of the file within the destination
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.png`);
    },
});
const upload = multer({ storage: storage });

module.exports = upload;
//! this is gonna allow us to make use of this "upload middleware"
