App.MainPageController = Ember.ObjectController.extend({
  needs: ['application'],
  username: '',
  password: '',
  passwordVerify: '',
  email: '',
  loginSuccess: false,
  backgroundHomePageOne: 'img/backgroundHomePageOne.png',
  backgroundHomePageTwo: 'img/backgroundHomePageTwo.png',
  backgroundHomePageThree: 'img/backgroundHomePageThree.png',
  backgroundHomePageFour: 'img/backgroundHomePageFour.png',
  backgroundHomePageFive: 'img/backgroundHomePageFive.png',
  backgroundHomePageSix: 'img/backgroundHomePageSix.png',
  middleBackground: 'img/middle_bckimg.png',
  bottomBackground: 'img/tixzoo_land.png',
  tixzooLogo: 'img/tixzoo-logo.png',
  affordabilityIcon: 'img/affordability-icon.png',
  facebookIcon: 'img/fb.png',
  instagramIcon: 'img/instagram.png',
  lockIcon: 'img/lock-icon.png',
  peertopeerIcon: 'img/messaging-icon.png',
  snapchatIcon: 'img/',
  twitterIcon: 'img/twitter.png',
  maxFrat: 'img/max-frat.png',
  disclosurePhoto: 'img/disclosure-artist.png',
  ticketEn: false,
  ticketJson: [],
  tempTicketJson: [],
  searchText: '',
  init: function() {
    this._super();
    var that = this;
    var message = null;
    var xhr = $.ajax({
        url: "Rest/mainController.php",
        type: "GET",
        dataType:'json',
        data: {init: true},
          success: function(data){
              that.set('ticketJson',data["tickets"]);
              that.set('tempTicketJson',data["tickets"]);
              that.set('ticketEn',true);
            if(data["cookie"]){
              that.set('username',data["cookie"]["user"]["username"]);
              that.set('password',data["cookie"]["user"]["password"]);
              that.set('loginSuccess',true);
            }
          },
        error: function(data){
          console.log(data);
        }
        }).done(function() {
          if (xhr.status != 200) { // error
            message = { errorCode: xhr.status, errorMessage: xhr.statusText };
          }
            that.set('controllers.application.ticketJson',that.get('ticketJson'));
            that.set('controllers.application.tempTicketJson',that.get('ticketJson'));
        });
  },
  updateLogin: function(){
    this.set('loginSuccess',this.get('controllers.application.loginSuccess'));
    this.set('username',this.get('controllers.application.username'));
    this.set('password',this.get('controllers.application.password')); 
  }.observes('controllers.application.loginSuccess'),
  modifiedContent: function(){

      var that = this;
      var search = this.get('searchText');
      var tickets = this.get('ticketJson');
      if (!this.get('ticketEn') || !search || search == '') {
        this.set('tempTicketJson',tickets);
        return tickets;
      }
              var message = null;
              var xhr = $.ajax({
                  url: "Rest/similarity.php",
                  type: "GET",
                  dataType:'json',
                  data: {search: search, list: tickets},
                    success: function(data){
                      if(data && data !== null){
                        that.set('tempTicketJson',data["tickets"]);
                      } else {
                        that.set('tempTicketJson',[]);
                      }
                    }
                  });
    }.observes('searchText','ticketEn'),
  ticketFeed: function() {
    this.set('controllers.application.tempTicketJson', this.get('tempTicketJson'));
    return this.get('tempTicketJson');
  }.property('tempTicketJson','searchText'),
  actions: {
    logout: function() {
      this.set('loginSuccess', false);
        var that = this;
        var message = null;
        var xhr = $.ajax({
          url: "Rest/mainController.php",
          type: "GET",
          dataType:'json',
          data: {logoutMode: "true"},
            success: function(data){
                that.set('controllers.application.loginSuccess',false);
            },
            error: function(error){
              console.log("why");
              console.log(error);
            }
          });

        if (xhr.status != 200) { // error
            message = { errorCode: xhr.status, errorMessage: xhr.statusText };
        }
        return message;

    }
  }
});