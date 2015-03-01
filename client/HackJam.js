Tasks = new Mongo.Collection("tasks");

if(Meteor.isClient){
   Template.body.helpers({
      tasks: function(){
         return Tasks.find(
            {},
            {sort: {createdAt: -1}}
         );
      }
   });

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

   Accounts.ui.config({
      passwordSignupFields: "USERNAME_ONLY"
   });
}