### BFF (Backend For Frontend)

#### What I know: 

<ul>
  <li>When frontend requires to reformat some data in order for UI to display</li>
  <li>After BFF built, which allows developer to make batch calls instead of making multiple API requests, which is better performance considerations [Aggregate API calls]</li>
  <li>We are able to have multiple BFFs, such as browser BFF, mobile BFF and etc</li>
  <li>BFF is like a bridge, which calls backend APIs and format the data like frontend required and send those format data to frontend to use [data abstraction]</li>
</ul>

#### Why we need BFF?

<ol>
  <li>Easier to maintain and modify APIs</li>
  <li>Easier to separate the ownership of services (less conflicts/overlaps)</li>
  <li>Better error handling for frontend, more user friendly</li>
  <li>Better Security, like token can be hidden (not exposed to browser), also some sensitive data would be able to be omitted if not needed</li>
</ol>


#### When to use BFF?

When backend is using micro-services architecture. BFF is not very good idea for monolith architecture


#### Example demo

![BFF E-commerce App Demo](https://res.cloudinary.com/dameng/image/upload/v1644833606/tipify/bff-demo.png)


#### Another small trick:

- When we use token based authentication? When the frontend domain and backend domain are different
- When we use session based authentication? When the frontend domain and backend domain are same 


<a href="https://blog.bitsrc.io/bff-pattern-backend-for-frontend-an-introduction-e4fa965128bf#:~:text=The%20microservices%20expose%20APIs%20to%20be%20used%20by%20the%20frontend.&text=In%20that%20case%2C%20the%20frontend,use%20up%20more%20browser%20resources." target="_blank">Reference One</a>

<a href="https://www.youtube.com/watch?v=zazeGmFmUxg" target="_blank">Reference Two</a>
