import React, { useState } from 'react';
export default function SignIn({props = ""}) {

    var date = new Date().toJSON().slice(0,10);
    var time = new Date().toJSON().slice(11,19)
    var dateTime = date+' '+time;
  
    return (
<div>
        {dateTime}
</div>
    );
  }