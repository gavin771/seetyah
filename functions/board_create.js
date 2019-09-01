const faunadb = require('faunadb')
const q = faunadb.query

// const client = new faunadb.Client({
//   secret: process.env.FAUNADB_SERVER_SECRET
// })

exports.handler = (event, context, callback) => {
  console.log("Function `boards.create` invoked")

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({})
  })
  // return client.query(q.Paginate(q.Match(q.Ref("indexes/all_boards"))))
  // .then((response) => {
  //   const boardRefs = response.data
  //   console.log("Board refs", boardRefs)
  //   console.log(`${boardRefs.length} boards found`)

  //   const getAllBoardDataQuery = boardRefs.map((ref) => {
  //     return q.Get(ref)
  //   })
  //   // then query the refs
  //   return client.query(getAllBoardDataQuery).then((ret) => {
  //     return callback(null, {
  //       statusCode: 200,
  //       body: JSON.stringify(ret)
  //     })
  //   })
  // }).catch((error) => {
  //   console.log("error", error)
  //   return callback(null, {
  //     statusCode: 400,
  //     body: JSON.stringify(error)
  //   })
  // })
}