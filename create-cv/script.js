$(document).ready(function () {

    // upload avatar
    //get image
    function uploadAvar(evt) {
        //file list
        var files = evt.target.files;
        for (let i = 0; i < files.length; i++) {
            const f = files[i];
            //check file image
            if (!f.type.match(".*image")) {
                continue;
            }
            // read file form memory
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#ava-image").attr("src", e.target.result);
            }
            reader.readAsDataURL(f);
        }
    }
    $("#input-image").change(uploadAvar);
    //show and hide to input avatar dialog
    $("#avatar").click(function () {
        $(".input-dialog").fadeIn();
    });
    $("#upload-btn").click(function () {
        $(".input-dialog").fadeOut();
        $("#avatar-icon").css({ "width": "100%", "padding-top": "0" });
        var src = $("#ava-image").attr("src");
        $("#avatar-icon img").attr("src", src);
    });
    $("#cancel-btn").click(function () {
        $(".input-dialog").fadeOut();
    });

    // toggle border of option
    $("section").hover(function () {
        $(this).css("border", "solid 2px rgb(212, 196, 196)");
        $(".menu", this).show();
    },
        function () {
            $(this).css("border", "none");
            $(".menu", this).hide();
        });

    // toggle border of block
    $(".block").hover(function () {
        $(this).css("border", "2px solid rgba(216, 214, 214, 0.623)");
        $(".menu-block", this).show();
    },
        function () {
            $(this).css("border", "none");
            $(this).css("border-bottom", "2px solid rgba(216, 214, 214, 0.623)");
            $(".menu-block", this).hide();
        });

    // toggle border of input box
    $("input, textarea").hover(function () {
        $(this).css("border", "0.5px dashed rgba(51, 124, 233, 0.863)")
    },
        function () {
            $(this).css("border", "none");
        });

    // dialog box to show option
    // hide and show
    $(".menu-icon").click(function () {
        $("#dialog").fadeIn();
    });
    $("#dialog").mouseleave(function () {
        $(this).fadeOut();
    });
    //select option
    var option = {
        "obj": $("#objective"),
        "edu": $("#education"),
        "exp": $("#exprience"),
        "ski": $("#skill"),
        "int": $("#interest"),
        "pro": $("#project"),
    }
    // add main options: objective, education, exprience, skill, interest, project
    $("#dialog div").click(function () {
        $("#dialog").hide();
        if ($(this).hasClass("obj-op")) {
            $("#objective").after(option.obj.clone(true));
        }
        if ($(this).hasClass("edu-op")) {
            $("#education").after(option.edu.clone(true));
        }
        if ($(this).hasClass("exp-op")) {
            $("#exprience").after(option.exp.clone(true));
        }
        if ($(this).hasClass("ski-op")) {
            $("#skill").after(option.ski.clone(true));
        }
        if ($(this).hasClass("int-op")) {
            $("#interest").after(option.int.clone(true));
        }
        if ($(this).hasClass("pro-op")) {
            $("#project").after(option.pro.clone(true));
        }
    });

    //add subb opption for education, exprience, skill, project (block)
    $(".plus").click(function () {
        var block = $(this).parents(".block").clone(true);
        $(this).parents(".block").after(block);
    });
    //delete block
    $(".trash").click(function () {
        //check number of block in option
        $(this).parents(".block").remove();
    });

    // validate contact information
    $("#name").keyup(function () {
        var name = $("#name").val();
        if (name === "") {
            $("#name").next().fadeIn();
        } else {
            $("#name").next().fadeOut();
        }
    });

    $("#phone").keyup(function () {
        var phone = $("#phone").val();
        if (phone === "") {
            $("#phone").next().text("phone number not empty");
            $("#phone").next().fadeIn();
        } else if (phone !== "" && isNaN(phone)) {
            $("#phone").next().text("not validated");
            $("#phone").next().fadeIn();
        } else {
            $("#phone").next().fadeOut();
        }
    });

    $("#email").keyup(function () {
        var email = $("#email").val();
        var re = /[a-zA-Z0-9]+@+[a-z]+\.+[a-z]+/g
        var check = re.test(email);
        if (email === "") {
            $("#email").next().text("email not empty")
            $("#email").next().fadeIn();
        } else if (email !== "" && check === false) {
            $("#email").next().text("not validated")
            $("#email").next().fadeIn();
        } else {
            $("#email").next().fadeOut();
        }
    });

    $("#address").keyup(function () {
        var address = $("#address").val();
        var address = $("#address").val();
        if (address === "") {
            $("#address").next().fadeIn();
        } else {
            $("#address").next().fadeOut();
        }
    });

    //move up down option
    //move up
    $(".move-up").click(function () {
        var element = $(this).parents(".option");
        element.prev(".option").before(element);
    });
    // move down
    $(".move-down").click(function () {
        var element = $(this).parents(".option");
        element.next().after(element);
    });

    // hide option
    $(".hide-btn").click(function () {
        $(this).parents(".option").remove();
    });

    //auto resize input
    $("input").on("keyup", function () {
        var input = $(this).val();
        if (input.length < 50) {
            $(this).attr("size", input.length);
        }
    });
    //remove auto resize of input time whent click
    $(".time > input").click(function () {
        $(".time > input").off("keyup");
    });
    //break line when press enter key
    $("textarea").keyup(function (e) {
        var rows = $(this).attr("rows");
        if (e.keyCode == 13) {
            rows++;
            $(this).attr("rows", rows);
        }
    });

    // save data of blocks (except contact block)
    var listId = [];
    $("#save-btn").click(function () {
        localStorage.clear();
        var count = 0;
        $(".option input, .option textarea").each(function () {
            //set id of each input and textarea
            var id = count + "input";
            $(this).attr("id", id);
            var value = $(this).val();
            localStorage.setItem(id, value);
            count++;
            listId.push(id);
        });
        localStorage.setItem("listId", JSON.stringify(listId));
        //save contact
        $("#contact input").each(function () {
            var id = $(this).attr("id");
            var value = $(this).val();
            localStorage.setItem(id, value);
        });
        //save html of container (sections except contact html)
        var profile = $(".profile").html();
        localStorage.setItem("profile", profile);
    });

    //load data
    $("#load-btn").click(function () {
        //load html profile 
        $(".profile").empty();//remove profile div
        var profile = localStorage.getItem("profile");
        $(".profile").append(profile);
        // load data of block (except contact block)
        var getId = JSON.parse(localStorage.getItem("listId"));
        $(".option input, .option textarea").each(function (index) {
            $(this).attr("id", getId[index]);
            var id = $(this).attr("id");
            var value = localStorage.getItem(id);
            $(this).val(value);
        });
        //load data of contact block
        $("#contact input").each(function () {
            var id = $(this).attr("id");
            var value = $(this).val(localStorage.getItem(id));
        });
        //reload event
        $("head script").each(function () {
            var oldScript = $(this).attr("src");
            $(this).remove();
            var newScript;
            newScript = document.createElement('script');
            $(newScript).attr("src", oldScript);
            document.getElementsByTagName("head")[0].appendChild(newScript);
        });
    });


    //print Cv to pdf
    $("#down-btn").click(function () {
        $("#container").css("width", "100%");
        $("#menu-bar").hide();
        window.print();
    });
    $("#contact").mouseenter(function () {
        $("#menu-bar").show();
        $("#container").css("width", "85%");
    });


});