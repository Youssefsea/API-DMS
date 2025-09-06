const Document = require('../DB/Data').Document;
const  User  = require('../DB/Data').User;

// ✅ Add new document
const addDocument = async (req, res) => {
  try {
    const { title, project, summary } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const fileUrl = `/uploads/${file.filename}`;

    const newDocument = new Document({
      title,
      project,
      summary: summary || '',
      fileUrl
    });

    await newDocument.save();

    res.status(201).json({
      message: 'Document added successfully',
      document: newDocument
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all documents
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get document by title
const getDocumentByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const document = await Document.findOne({ title });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update document
const updateDocument = async (req, res) => {
  try {
    const title = req.params.title;
    const updates = req.body;

    const document = await Document.findOneAndUpdate({ title }, updates, { new: true });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({
      message: 'Document updated successfully',
      document
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete document
const deleteDocument = async (req, res) => {
  try {
    const title = req.params.title;
    const document = await Document.findOneAndDelete({ title });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add document version
const addDocumentVersion = async (req, res) => {
  try {
    const title = req.params.title;
    const versionBody = req.body;

    const document = await Document.findOne({ title });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    document.versions.push(versionBody);
    await document.save();

    res.status(200).json({
      message: 'Version added successfully',
      document
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add comment
const addCommentToDocument = async (req, res) => {
  try {
    const title = req.params.title;
    const { text } = req.body;

    const document = await Document.findOne({ title });
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    document.comments.push({ username: user.username, text });
    await document.save();

    res.status(200).json({
      message: 'Comment added successfully',
      document
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addDocument,
  getAllDocuments,
    getDocumentByTitle,
    updateDocument,     
    deleteDocument,
    addDocumentVersion,
    addCommentToDocument
};
