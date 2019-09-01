/* bootstrap database in your FaunaDB account */
require('dotenv').config()

const faunadb = require('faunadb')
const readline = require('readline')
const chalk = require('chalk')
const insideNetlify = insideNetlifyBuildContext()
const q = faunadb.query

// 1. Check for required enviroment variables
if (!process.env.FAUNADB_ADMIN_SECRET) {
  console.log(
    chalk.yellow('Required FAUNADB_ADMIN_SECRET enviroment variable not found.')
  )
  if (insideNetlify) {
    console.log(`Visit https://app.netlify.com/sites/seetyah/settings/deploys`)
    console.log(
      'and set a `FAUNADB_ADMIN_SECRET` value in the "Build environment variables" section'
    )
    process.exit(1)
  }
  // Local machine warning
  if (!insideNetlify) {
    console.log()
    console.log(
      'You can create fauna DB keys here: https://dashboard.fauna.com/db/keys'
    )
    console.log()
    ask(chalk.bold('Enter your faunaDB server key'), (err, answer) => {
      if (!answer) {
        console.log('Please supply a faunaDB server key')
        process.exit(1)
      }
      createFaunaDB(process.env.FAUNADB_ADMIN_SECRET).then(() => {
        console.log('Database created')
      })
    })
  }
}

// Has var. Do the thing
if (process.env.FAUNADB_ADMIN_SECRET) {
  createFaunaDB(process.env.FAUNADB_ADMIN_SECRET)
}

/* idempotent operation */
function createFaunaDB(key) {
  const client = new faunadb.Client({
    secret: key,
  })

  /* Based on your requirements, change the schema here */
  return client
    .query(q.CreateDatabase({ name: 'seetyah' }))
    .then(() => {
      console.log('Seetyah Database created')
      client
        .query(q.CreateKey({ database: q.Database('seetyah'), role: 'server' }))
        .then(ret => {
          const serverClient = new faunadb.Client({
            secret: ret.secret,
          })
          serverClient
            .query(q.CreateCollection({ name: 'boards' }))
            .then(() => {
              console.log('Board Collection created')
              serverClient
                .query(
                  q.CreateIndex({
                    name: 'board_by_name',
                    source: q.Collection('boards'),
                    terms: [{ field: ['name'] }],
                  })
                )
                .catch(e => {
                  console.log('Create Index error')
                  console.log(e)
                  throw e
                })
            })
        })
    })
    .catch(e => {
      console.log('Create DB error')
      console.log(e)
      throw e
    })
}

/* util methods */

// Test if inside netlify build context
function insideNetlifyBuildContext() {
  if (process.env.DEPLOY_PRIME_URL) {
    return true
  }
  return false
}

// Readline util
function ask(question, callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question(question + '\n', function(answer) {
    rl.close()
    callback(null, answer)
  })
}
