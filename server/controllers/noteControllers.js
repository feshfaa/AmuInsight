const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');
const NoteRelation = require('../models/NoteRelationModel')

// @desc    Get notes   @route   GET /api/posts @access  Private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user.id });

    res.status(200).json(notes);
  })

// @desc    Set note    @route   POST /api/posts    @access  Private
const setNote = asyncHandler(async (req, res) => {
    if(!req.body.courseName||!req.body.title||!req.body.fileLocation){
      res.status(400)
      throw new Error('Please insert all fields')
    }
  
    const note = await Note.create({
      courseName:req.body.courseName,
      title:req.body.title,
      fileLocation:req.body.fileLocation,
      status:req.body.status
    });

    if(note){
        const noteRelation = await NoteRelation.create({
            CurrentNote: note.id,
            user: req.user.id,
        });
    }
  
    res.status(200).json(note)
})

// @desc    Update exam @route   PUT /api/goals/:id @access  Private
const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if (!note) {
        res.status(400)
        throw new Error('Note not found')
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedNote)
})

// @desc    Delete note @route   DELETE /api/goals/:id  @access  Private
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)
    const user = await Exam.findById(req.params.id)

    if (!note) {
        res.status(400)
        throw new Error('Exam not found')
    }

    await Note.deleteOne()
    // await NoteRelation.deleteOne()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getNotes,
    setNote,
    updateNote,
    deleteNote,
}