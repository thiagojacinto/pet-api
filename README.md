# pet-api
Developing a NodeJS API for Pet Store

## Why?

This is summary of the NodeJS API development bootcamp from Alura Cursos Online. 
While working testing node APIs, it was a good idea to build some experience with development and its possible struggles. So, this is a simple API that connect a SQL database (MySQL) made firstly for enhance learning purposes.

## Testing

This API was developed taking in consideration TESTS. But of what kind? Not the pyramid basis unit tests, but the ones that brings a vision of HOW and FOR WHAT this piece of software is build. So feature and integration tests caught my attention from the very begining so following that path, I tried to write the BDD way.

### Driven design

> Deliberate practice way of life

#### Main :: Redirect to /atendimento
```gherkin
WHEN access home "/"
THEN should redirect to "/atendimento"
AND status should be 301
```

#### /atendimento :: Register atendimento
```gherkin
GIVEN have a correct filled atendimento properties
WHEN post it to /atendimentos
THEN a new atendendimento must be created
```

#### /atendimento :: Register atendimento :: Invalid name
```gherkin
GIVEN a small client name into atendimento
WHEN post it to /atendimentos
THEN name validator error should be thrown
```

#### /atendimento :: Register atendimento :: Invalid createdAt
```gherkin
GIVEN a wrong date input in atendimento
WHEN post it to /atendimentos
THEN name validator error should be thrown
```

#### /atendimento :: List atendimentos
```gherkin
WHEN get /atendimento
THEN returns a list of saved atendimentos
```

#### /atendimento :: Search atendimento by ID
```gherkin
GIVEN a registered atendimento with ID
WHEN search for an ID at /atendimento/ID
THEN returns the existent atendimento for that ID
```

#### /atendimento :: Search atendimento by inexistent ID
```gherkin
GIVEN a non-registered atendimento ID
WHEN search with that ID at /atendimento/ID
THEN returns error 404 and empty object
```

#### /atendimento :: Patch atendimento by valid ID
```gherkin
GIVEN a registered atendimento ID
WHEN patch with that ID at /atendimento/ID
THEN returns status 202
AND the atendimento is updated
```

#### /atendimento :: Patch atendimento by inexistent ID
```gherkin
GIVEN a non-registered atendimento ID
WHEN patch with that ID at /atendimento/ID
THEN returns status 404
AND no changes are registered
```

#### /pets :: Register Pet
```gherkin
GIVEN have a correct filled Pet properties
WHEN post it to /pets
THEN a new pet must be created
```