var mongoose = require('mongoose');

// model of a wiki entry
var Wiki = mongoose.model('Wiki',{
  name: {
    type : String,
    required : true,
    minlength: 1,
    trim : true
  },
  noted : {
    type : Boolean,
    default: false
  },
  data : {
    type : String
  },
  completedAt: {
    type : Number,
    default : null
  },
  _creater: {
    type:mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {
  Wiki: Wiki
};
