var userIdInput = document.querySelector('#userId');
var submitIdBtn = document.querySelector('#submitIdBtn');
var friendIdInput = document.querySelector('#friendId');
var connectBtn = document.querySelector('#connectBtn');
var messageField = document.querySelector('#message');
var sendMessageBtn = document.querySelector('#sendMessageBtn');
var receiverIdInput = document.querySelector('#receiverId');
var peer;
var connections = {};


submitIdBtn.addEventListener('click', function(event) {
  event.preventDefault();
  peer = new Peer(userIdInput.value, {host: 'localhost', port: 9000, path: '/peerjs'});

  peer.on('connection', function(conn) {
    connections[conn.peer] = conn;
    conn.on('data', function(data) {
      console.log(data);
    });
  });

  // automatically connect to two other peers.
  peer.on('open', function(id, clientIds) {
    // filter out your own id 
    var peerIds = clientIds.filter(function(peerId) {
      return id !== peerId;
    })

    var i;
    for (i = 0; i < 2; i += 1) {
      // if no peers exist then break out of loop.
      if (peerIds.length <= 0) return;
      // choose a random number betweeen 1 and (peerIds.length - 1)
      var max = peerIds.length - 1;
      var min = 0;
      var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

      var peerId = peerIds[randomNum];
      var conn = peer.connect(peerId);
      connections[conn.peer] = conn;

      conn.on('open', function(){
        conn.send('hi!');
      });
      
      conn.on('data', function(data){
        console.log(data);
      });

      conn.on('close', function() {
        delete connections[conn.peer];
      });

      // remove this peer so that you don't try to connect to them again
      peerIds = peerIds.filter(function(id) {
        return peerId !== id;
      });
    };
  });
});


// connectBtn.addEventListener('click', function(event) {
//   event.preventDefault()
//   var conn = peer.connect(friendIdInput.value);
//   connections[conn.peer] = conn;
//   conn.on('open', function(){
//     conn.send('hi!');
//   });
//   conn.on('data', function(data){
//     console.log(data);
//   });
// });


sendMessageBtn.addEventListener('click', function(event) {
  event.preventDefault();
  var conn = connections[receiverIdInput.value];
  console.log('>>>>sending message to ' + conn.peer);
  conn.send(messageField.value);
});

var deck;
['red', 'green', 'blue'].forEach(function(color) {
  for (var i = 0; i<10; i += 1) {
    deck.push({
      color: color,
      pubkey: undefined
    });
  }
  return colors;
});


var gBlock = {
  inputs: [],
  deck: deck,
  card: undefined,
  tracks: [],
  owner: undefined,
};

