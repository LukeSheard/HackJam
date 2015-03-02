Classes = new Mongo.Collection("courseid");
Tasks = new Mongo.Collection("tasks");

if(Meteor.isClient){
   Template.body.helpers({
      courses: function(){
         return Classes.find(
            {},
            {}
         )
      }
   });

   Template.course.helpers({
      tasks: function(args){
         if(Tasks.find(
            {course: args},
            {sort: {checked: 1, completedAt: 1, createdAt: -1}}
         ).fetch() != null){
            return Tasks.find(
               {course: args},
               {sort: {checked: 1, completedAt: 1, createdAt: -1}}
            ).fetch();
         } else{
            return false;
         }
      }
   });

   Template.course.helpers({
      assignments: function(args){
         if(Tasks.find(
            {course: args}, {}
         ).fetch()[0] != null){
            return true;
         } else{
            return false;
         }
      }
   })

   Template.body.events({
      "submit .new-task": function(event) {
         var entry1 = event.target.course.value;
         var entry2 = event.target.title.value;
         var entry3 = event.target.date.value;
         var entry4 = event.target.notes.value;
         
         Tasks.insert({
            course: entry1,
            title: entry2,
            date: entry3,
            notes: entry4,
            createdAt: new Date(),
         });

         event.target.course.value="";
         event.target.title.value="";
         event.target.date.value="";
         event.target.notes.value="";

         return false;
      }
   });

   Template.body.events({
      "submit .new-course": function(event) {

         var entry1 = event.target.classid.value;
         if (entry1!=""){
            Classes.insert({
               course: entry1,
            });
         }         

         event.target.classid.value="";

         return false;
      }
   });

   Template.task.helpers({
      userCheck: function(){
         if (Meteor.userId() == this.owner){
            return true;
         }
         else{
            return false;
         }

      }
   });

   Template.body.events({
      "click .item": function(event){
         Tasks.update(
            this._id,
            {
               $set: {
                  completedAt: new Date(),
                  checked: !this.checked
               }
            }
         );
      }, 

      "click .checked": function(event){
         Tasks.remove(this._id);
      },

      "click .undo": function(event){
         Tasks.update(
            this._id,
            {
               $set: {
                  completedAt: null,
                  checked: !this.checked
               }
            }
         );
      }

   });

   Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
   });
}