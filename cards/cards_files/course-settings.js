if( !window.CourseSettings )
{
  var CourseSettings =
  {};

  CourseSettings.toggleCourseAvailability = function( courseId )
  {
     var toggleState = widget.LockUnlockToggle.getToggleState( 'courseAvailabilityToggle' );

     var actionUrl = "/webapps/blackboard/course/courseProperties/setCourseAvailability?course_id=" + courseId + "&courseAvailability=" + toggleState + '&' + CourseSettings.nonceKey + '=' + CourseSettings.nonceValue;

     var deferred = new $j.Deferred();
     
     var myAjax = $j.ajax({
       url: actionUrl,
       type: "POST",
       contentType: "application/json; charset=utf-8",
       success: function( data ) {
       if( data.hasError && data.errorMessage )
       {
         deferred.reject( data.errorMessage );
       }
       else
       {
         deferred.resolve();
       } 
       },
       error: function( xhr, textStatus, errorThrown) {
         deferred.reject( textStatus );
       }
     });
     
     return deferred.promise();
  };

  CourseSettings.clickCourseAvailabilityToggle = function( courseId )
  {
      CourseSettings.toggleCourseAvailability( courseId )
      .done( function() { location.reload(); } )
      .fail( function( textStatus ) { alert( textStatus ); location.reload(); } );
  };
}
