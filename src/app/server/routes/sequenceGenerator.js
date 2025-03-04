const Sequence = require('../models/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

async function initializeSequence() {
  try {
    // Fetch the sequence from the database
    const sequence = await Sequence.findOne();

    if (!sequence) {
      throw new Error('Sequence not found');
    }

    // Initialize variables with sequence data
    sequenceId = sequence._id;
    maxDocumentId = sequence.maxDocumentId;
    maxMessageId = sequence.maxMessageId;
    maxContactId = sequence.maxContactId;
  } catch (err) {
    console.error('Error initializing sequence:', err);
  }
}

// Call this function to initialize sequence values when the application starts
initializeSequence();

// The nextId function can be used to get the next ID for a given collection type
async function nextId(collectionType) {
  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      console.log("MAX CONTACT ID SEQUENCE1: ", maxContactId)
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      console.log("MAX CONTACT ID SEQUENCE2: ", nextId)
      break;
    default:
      return -1; // Invalid collection type
  }

  try {
    // Update the sequence in the database
    await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
    return nextId;
  } catch (err) {
    console.error("Error updating nextId:", err);
    return null;
  }
}

module.exports = {
  initializeSequence,
  nextId
};
