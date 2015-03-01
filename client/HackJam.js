Tasks = new Mongo.Collection("tasks");

if(Meteor.isClient){
   Template.body.helpers({
      tasks: function(){
         return Tasks.find(
            {},
            {sort: {checked: 1, completedAt: 1, createdAt: -1}}
         );
      }
   });

   Template.body.events({
      "submit .new-task": function(event) {
         var text = event.target.text.value;
         var date = new Date();
         Tasks.insert({
            text: text,
            createdAt: date,
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            owner: Meteor.userId(),
            username: Meteor.user().username
         });

         event.target.text.value="";
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