### Serverless Tips

<b>1.</b> Serverless Patterns

Strangler Pattern: used when needing migrate legacy app to cloud environment

Circuit Breaker Pattern: used when calling internal & external APIs

Router Pattern: Asynchornous decision making (Simple to implement, cost efficient, decoupling)

- Dynamic router only redirect the request to which service asynchronously

Distributed Trigger Pattern: used when needs to break down monolithic app into microservices with even driven architecture

- 2 roles: publisher and subscriber, publisher send data via message event bus and evet bus is smart enough to detect where the message should be delivered to and which subscriber is going to subscribe the message/data

<b>2.</b>
