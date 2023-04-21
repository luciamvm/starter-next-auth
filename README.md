This is a [Next.js](https://nextjs.org/) project.
The project is a good point of start if you will need to develop a website that needs authentication.

- Developed in typescript.
- Using [Chakra UI](https://chakra-ui.com/) for UI/UX.
- Authentication with [next-auth](https://next-auth.js.org/)

NextAuth give the possibility to do authentication by Google, Github and mutch more. Here is configured only with credentials (email and password).

To validate credentials I'm using a mongo db.
The elements of the collection is something like that:
```bash
{
  email: email@email.pt
  password: test
}
```


## To run this example on your machine: 

First, clone the repo:

```bash
git clone https://github.com/luciamvm/starter-next-auth.git
```

Then, install packages:

```bash
yarn install
```


Now, you can run the project and test the result in your browser:

```bash
yarn dev
```

