$(document).ready(function () {

  if($("#categoryUser")[0]){
    setTimeout(selectorReset, 200);
    const lastParam=window.location.pathname.split("/")[window.location.pathname.split("/").length-1];
    function selectorReset(){
      document.getElementById("categoryUser").value = lastParam;
    }
  }

  $.get("/api/user/data",function(data){
    const ID=data.id;

        let myCat = data.linkCategories.split(",");
        let catSel=$("<select>").attr("class", "catSel");
        catSel.append($("<option>").attr("value", "null").text("Change Category"));
        for (var i = 1; i < myCat.length; i++) {
          let catOp=$("<option>").attr("value", myCat[i]).text(myCat[i]);
          catSel.append(catOp);
        }
        $(".cat"+ID).append(catSel);



  });
  // click to open and close Modal


  $(".add-link-button").click(function() {
    $(".newLink-box").show();
  })

  $("#edit-profile").click(function(){
    $(".profile-box").show();
  })


  $("#new-link-submit").click(function(){
    $(".newLink-box").hide();
  })
  $("profile-submit").click(function(){
    $(".profile-box").hide();
  })
  $(".close-btn").click(function(){
    $(".newLink-box").hide();
    $(".profile-box").hide();
  })

$(".target_home").on("click", function(){
  console.log("home");
  window.location.href = `/home`;
});

$(".target_search").on("click", function(){
  console.log("search");
  window.location.href = `/search/all`;
  });

$(".target_person").on("click", function(){
  console.log("person");

  $.get("/api/user/data",function(data){
    const ID=data.id;
    console.log(data);
    return window.location.href = `/user/${ID}/all`;
  });
})
$(".card").on("click", function(){
  let TC=$(this).data("totalclicks");
  let DC=$(this).data("dailyclicks");
  TC++
  DC++
  console.log("ajax click",TC, DC);
  var newPost = {
    totalClicks: TC,
    dailyClicks: DC,
    id: $(this).data("id")
  };
  $.ajax({
    method: "PUT",
    url: "/api/link/update",
    data: newPost
  })
    .then(function() {
      location.reload();
      console.log("ajax done");
    });
})
$("#categoryUser").change(function(){
  $("select option:selected").each(function(){
    const x = document.getElementById("categoryUser").selectedIndex;
    const categoryValue = document.getElementsByTagName("option")[x].value;
    console.log(window.location.path,categoryValue);
    window.location.href=`${categoryValue}`;
  })
})

$(".catSel").change(function(){
  if ($(this).find('option:selected').val()=="null") {
    return;
  }else{
    var newPost = {
      category: $(this).find('option:selected').val(),
      id: $(this).data("id")
    };
    $.ajax({
      method: "PUT",
      url: "/api/link/update",
      data: newPost
    })
      .then(function() {
        location.reload();

        console.log("ajax done");
      });

    }
})
});
