var Observable = {
    observers: [],
    lastId: -1,
    addObservers: function(observer){
        this.observers.push({
            callback: observer,
            id: ++lastId
        });
        return this.lastId;
    },
    removeObservers: function(observer){
        var index = this.observers.indexOf(observer);
        if (~index) {
            this.observers.splice(index, 1);
        }
    },
    notifyObservers: function(message){
        for(var i = this.observers.length - 1; i >= 0; i--){
            this.observers[i](message);
        }
    }
}
 

Observable.addObservers(function(message){
    console.log("Iam first observer and message: ", message);
});

Observable.addObservers(function(message){
    console.log("Iam second observer and message: ", message);
});

var coolObserver = function(message) {
    console.log("Iam third observer and message: ", message); 
}
Observable.addObservers(coolObserver);

Observable.notifyObservers("I kill you mother fucker");

Observable.removeObservers(coolObserver);

Observable.notifyObservers("Ok. Stay a live...");



