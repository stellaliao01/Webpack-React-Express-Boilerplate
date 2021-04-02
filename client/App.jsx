import React, { useState } from "react";

import BTCAClient from "btca-client";

// Story 1085272158
// Channel 362738
// User 318954

let BTCA = new BTCAClient({
  handle: "MY_BTCA", // unqiue handle to identify BTCA
  cache: true, // caches requests (useful for debugging)
  disableEvents: true, // disables default events
  log: true, // logs actions to console
});

console.log("btcs", BTCA);
// define your JSBridge action
let openData = {
  action: "openEntity",
  params: {
    entityName: "story",
    id: 1085272158,
    disableLegacyRouting: true,
  },
};

let data = {
  action: "getEntity",
  params: {
    entityName: "channel",
    id: 362738,
  },
};

// // send with anonymous callback
// BTCA.send(data, function (result, requestId, error) {
//   console.log(result);
// });

// function handleRequestResponse(result, requestId, error) {
//   console.log(result);
//   if (error) {
//     console.log(error);
//   }
// }
// // console.log("test", BTCA.btcjsapiOperations[0].requestData.requestString);
// function goTo() {
//   return (
//     <a href='btcjsapi://getList?entityName=story&id=123&jsListener=handleRequestResponse'></a>
//   );
// }

// send with callback reference
// BTCA.send(data, handleRequestResponse);
// send with btcjsapi:// schema and named jsListener callback
// BTCA.send('btcjsapi://getList?entityName=story&id=123&jsListener=handleRequestResponse')
// BTCA.send(
//   `btcjsapi://openList?entityName=story&id=1085272158&jsListener=handleRequestResponse`
// );
// location.href = `btcjsapi://openEntity?jsListener=BTCA_CB_a4538402-e306-4978-a05b-a6ca16034439;

function App() {
  return (
    <div className='nav'>
      <div className='title'>
        <h1> ThreeButtons</h1>
      </div>
      <div className='buttons'>
        <button
          onClick={() =>
            BTCA.send(openData, function (result, requestId, error) {
              console.log("open error", error);
              console.log("open result", result);
            })
          }
        >
          <i className='fas fa-book'></i>&nbsp;&nbsp;Story
        </button>

        <button
          onClick={() => {
            BTCA.send(data, function (result, requestId, error) {
              console.log("channelresult", result);
            });
          }}
        >
          <i className='far fa-file-alt'></i>&nbsp;&nbsp;Channel
        </button>

        <button
          onClick={() => {
            window.open(
              BTCA.send(
                "getEntity?jsListener=BTCA_CB_200c804d-4e24-4020-a3fc-cb1f8f9d83f7&requestId=1085272158"
              )
            );
            {
              /*BTCA.send(
              `getEntity?jsListener=BTCA_CB_200c804d-4e24-4020-a3fc-cb1f8f9d83f7&requestId=1085272158`
            )*/
            }
            console.log("lol just making sure this button be working");
          }}
        >
          <i className='fas fa-user'></i>&nbsp;&nbsp;User
        </button>
      </div>
    </div>
  );
}

export default App;
