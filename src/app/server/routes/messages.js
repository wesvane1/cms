const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  Message.find().then(messages => {
    res.status(200).json(messages)
  }).catch(err => {
    res.status(500).json({message: 'Error retrieving messages', error: err})
  })
})

router.post('/', async (req, res, next) => {
  try {
    const maxMessageId = sequenceGenerator.nextId("messages");

    const message = new Message({
      id: maxMessageId,
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: req.body.sender
    });

    const createdMessage = await message.save();
    res.status(201).json({
      message: 'Message added successfully',
      contact: createdMessage
    });

  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error
    });
  }
});

router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(204).json({
            message: 'Message updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Document deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found'}
      });
    });
});


module.exports = router; 
