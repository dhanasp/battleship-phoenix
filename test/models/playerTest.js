const assert = require('chai').assert;
const Player = require('./../../src/models/player.js');
const Fleet = require('./../../src/models/fleet.js');

describe('Player', () => {
  let player;
  beforeEach(function () {
    player=new Player(1,'player');
  });
  describe('addPlayer', () => {
    it('should add a new player with Id 1', () => {
      let actual=player.playerId;
      let expected=1;
      assert.equal(actual, expected);
    });
  });
  describe('getPlayerName', () => {
    it('should give the player name', () => {
      let actual=player.playerName;
      let expected="player";
      assert.equal(actual, expected);
    });
  });
  describe('getPlayerId', () => {
    it('should give the player Id', () => {
      let actual=player.playerId;
      let expected='1';
      assert.equal(actual, expected);
    });
  });
  describe('getPlayerName', () => {
    it('should give the player name', () => {
      let actual=player.playerName;
      let expected="player";
      assert.equal(actual, expected);
    });
  });
  describe('isHit', () => {
    it('should return true when fleet any ship hit by opponent', () => {
      let fleet = new Fleet();
      let subShipInfo = {dir:'south',name:"carrier",headPos:[2,3]};
      fleet.addShip(subShipInfo);
      player.addFleet(fleet);
      let actual = player.isHit([2,3]);
      assert.ok(actual);
    });
    it('should return false when fleet any ship is not hit by opponent', () => {
      let fleet = new Fleet();
      let subShipInfo = {dir:'south',length:4,headPos:[2,3]};
      fleet.addShip(subShipInfo);
      player.addFleet(fleet);
      let actual = player.isHit([1,2]);
      assert.isNotOk(actual);
    });
  });
  describe('shots', () => {
    it('should give all the shots of player', () => {
      let actual=player.shots;
      let expected={hits:[],misses:[]};
      assert.deepEqual(actual, expected);
    });
  });
  describe('updateShot', () => {
    it('should update the hit and miss shots of player', () => {
      player.updateShot('hits',[1,2]);
      let actual = player.shots;
      let expected={hits:[[1,2]],misses:[]};
      assert.deepEqual(actual, expected);
    });
  });
  describe('isItYourTurn', function () {
    it('should give true if given id is his id', function () {
      assert.isTrue(player.isItYourId(1));
    });
    it('should give false if its not his id', function () {
      assert.isFalse(player.isItYourId(2));
    });
  });
  describe('isPosIncludesInShots', function () {
    it('should return true when position already in shots', function () {
      player.updateShot('hits',[1,2]);
      assert.ok(player.isPosIncludesInShots([1,2],'hits'));
      assert.isNotOk(player.isPosIncludesInShots([1,2],'misses'));
    });
    it('should return false when position is not in shots', function () {
      player.updateShot('hits',[1,2]);
      assert.isNotOk(player.isPosIncludesInShots([1,2],'misses'));
    });
  });
  describe('isAlreadyFired', function () {
    it('should return true when position already fired', function () {
      player.updateShot('hits',[1,2]);
      assert.ok(player.isAlreadyFired([1,2]));
    });
    it('should return false when position is not fired', function () {
      player.updateShot('hits',[1,2]);
      assert.isNotOk(player.isAlreadyFired([2,2]));
    });
  });
  describe('getDestroyedShipsCoords', () => {
    beforeEach(() => {
      let fleet = new Fleet();
      let subShipInfo = {dir:'south',name:"destroyer",headPos:[0,0]};
      fleet.addShip(subShipInfo);
      player.addFleet(fleet);
    });
    it('should give coordinates of destroyed ships', () => {
      let actual = player.getDestroyedShipsCoords();
      let expected=[];
      assert.deepEqual(actual, expected);
    });
    it('should give coordinates of destroyed ships', () => {
      player.isHit([0,0]);
      player.isHit([0,1]);
      let actual = player.getDestroyedShipsCoords();
      let expected=[ [ [ 0, 0 ], [ 0, 1 ] ] ];
      assert.deepEqual(actual, expected);
    });
  });
  describe('updateLastShot', () => {
    beforeEach(() => {
      player.updateLastShot([1,2],true);
    });
    it('should update the last shot details of player', () =>{
      let actual = player.getLastShot();
      let expected = {shot : [1,2], status :true};
      assert.deepEqual(actual,expected);
    });
  });
  describe('getLastShot', () => {
    beforeEach(() => {
      player.updateLastShot([1,2],true);
    });
    it('should return last shot when shot is made', () =>{
      let actual = player.getLastShot();
      let expected = {shot : [1,2], status :true};
      assert.deepEqual(actual,expected);
      assert.deepEqual(player.getLastShot(),undefined);
    });
    it('should return undefined when last shot is already been taken once',()=>{
      let actual = player.getLastShot();
      assert.deepEqual(player.getLastShot(),undefined);
    });
  });
  describe('totalShots', () => {
    beforeEach(() => {
      player.updateShot('hits',[1,2]);
      player.updateShot('hits',[2,3]);
      player.updateShot('misses',[2,4]);
    });
    it('should return the total shots of the player', () =>{
      let actual = player.totalShots;
      assert.equal(actual,3);
    });
  });
  describe('totalHits', () => {
    beforeEach(() => {
      player.updateShot('hits',[1,2]);
      player.updateShot('hits',[2,3]);
      player.updateShot('misses',[2,4]);
    });
    it('should return the total shots of the player', () =>{
      let actual = player.totalHits;
      assert.equal(actual,2);
    });
  });
});
