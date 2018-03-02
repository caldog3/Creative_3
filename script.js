"use strict";

	Vue.directive("auto-focus", {
		bind: function () {
			Vue.nextTick(function () {
				this.el.focus();
			}.bind(this));
		}
	});

	new Vue({

		el: "#todo",

		data: {
			newTask: "",
			tasks: [
				{
					text: "Example: Mewtwo",
					checked: false
				}
			],

			editingTask: {

			}
		},

		computed: {
			areAllSelected: function () {
				return this.tasks.every(function(task) {
					return task.checked;
				}) &&  this.tasks.length > 0;
			},
		},

		methods: {

			addTask: function () {
				var task = this.newTask.trim();
				if (task) {
					this.tasks.push({text: task, checked: false});
					this.newTask = "";
				}
			},

			removeTask: function (task) {
        var index = this.tasks.indexOf(task);
				this.tasks.splice(index, 1);
			},

			editTask: function (task) {
				this.editingTask = task;
			},

			endEditing: function (task) {
				this.editingTask = {};
				if (task.text.trim() === ""){
					this.removeTask(task);
				}

			},

			clearList: function () {
				this.tasks = [

				];
			},

			selectAll: function (task) {
				var targetValue = this.areAllSelected ? false : true;
				for (var i = 0; i < this.tasks.length; i++) {
					this.tasks[i].checked = targetValue;
				}
			},

			check: function (task) {
				task.checked = true;
			},

			isChecked: function (task) {
				return task.checked;
			}

		}
	});


  $( ".type" ).mouseenter(function() {
      $( this ).animate({boxShadow: '0 0 30px #333'}, 200 );
  });
  $( ".type" ).mouseleave(function() {
      $( this ).animate({boxShadow: '0 0 0 #000000'}, 200 );
  });
  function jsUcfirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function jsLcfirst(string) {
      return string.charAt(0).toLowerCase() + string.slice(1);
  }
  function BraceToSpace(string) {
      return string.replace(/-/g, " ");
  }
  function SpaceToBrace(string) {
      return string.replace(/ /g, "-");
  }

  $(document).ready(function() {

     var submitButton = $("#pokemonSubmit");
     var pokemonResults = document.getElementById("pokemonResults");
     console.log(submitButton);
     $("#pokemonSubmit").click(function(e) {
          $('.pokeball').show();
          $('.pokeball__button').show();
          e.preventDefault();
          /*var form = $("#pokemonForm").val(); */
          var form = "pokemon";
          var value = jsLcfirst($("#pokemonInput").val());
          var myurl = "https://pokeapi.co/api/v2/" + form + "/" + value + "/";
          /*
          */
          $.ajax({
            /* */
              url : myurl,
              dataType : "json",
             beforeSend: function(){
                  $('.pokeball').show();
                  $('.pokeball__button').show();
              },

              success : function(json) {
              var results = "";
              console.log(json);
              if (form === "pokemon") {
                var name = json.name;
                name = jsUcfirst(name);
                results += "<h2 class='pokeNum'>#" + json.id + "</h2>";
                results += "<h2 class='poke-name' id='its-name'>" + name
                  + ":</h2><br>" + "<h2 class='type " + json.types[0].type.name + "'>" + jsUcfirst(json.types[0].type.name) + " </h2>";
                if (json.types.length > 1) {
                  for (var i = 0; i < json.types.length - 1; ++i) {
                    results += "<h2 class='type " + json.types[i + 1].type.name + "'>" + jsUcfirst(json.types[i + 1].type.name) + " </h2>";
                  }
                }

                var moves = "<p class = 'moves'><br>";
                for (var i = 0; i < 4; ++i) {
                  moves +=i + 1 + ":";
                  moves += BraceToSpace(jsUcfirst(json.moves[i].move.name));
                  moves += "<br>";
                }
                moves += "</p>";
                results += moves;
                results += "<p class='right-side'>";
                var picture = json.sprites.front_default;
                results += '<img src=' + picture + ' class="pokeSprities"/>';
                results += "</p>";
              }
              $("#pokemonResults").html(results);
            },
            complete:function(){
                $('.pokeball').hide();
                $('.pokeball__button').hide();
            }
          }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("No Pok\xE9mon found");
          });

     });
  });
  $(document).ready(function() {
     var submitButton = $("#itemSubmit");
     console.log(submitButton);
     $("#itemSubmit").click(function(e) {
          $('.pokeball').show();
          $('.pokeball__button').show();
          e.preventDefault();
          /*var form = $("#pokemonForm").val(); */
          var form = "item";
          var value = jsLcfirst(SpaceToBrace($("#itemInput").val()));
          var myurl = "https://pokeapi.co/api/v2/" + form + "/" + value + "/";
          /*
          */
          $.ajax({
            /* */
              url : myurl,
              dataType : "json",
             beforeSend: function(){
                  $('.pokeball').show();
                  $('.pokeball__button').show();
              },

              success : function(json) {
              var results = "";
              console.log(json);
              if (form === "item") {
                var name = json.name;
                name = jsUcfirst(name);
                results += "<h2 style='text-align:center'>" + BraceToSpace(name) + ":</h2>";
                results += "<p>";
                var picture = json.sprites.default;
                results += '<img src=' + picture + ' class="sprities"/>';
                results += "</p>"
                var effect = json.effect_entries[0].short_effect;
                results += "<p class='effect'>" + effect;
                results += "</p>";

              }
              $("#itemResults").html(results);
            },
            complete:function(){
                $('.pokeball').hide();
                $('.pokeball__button').hide();
            }
          }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("No Item found\nTry using spaces and typing in all lower-case\n(ie. \"poke ball\")");
          });

     });
  });
