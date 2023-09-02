import express from "express"

const app = express()

const db = {
    users : []
}

app.use(express.json())

app.post("/userInfo",(req,res) => {
   const {UserId, Name, Age, City} = req.body
   const userInfo = {
    UserId, Name, Age, City
   }
   db.users.push(userInfo)

   res.status(201).json({
    data : {
        message : "User Detail added successfully!"
    }
   })
})

app.get("/users",(req,res) => {
    res.status(201).json({
        data : {
            users : db.users
        }
    })
})


app.get("/singleUser/:UserId",(req,res) =>{
    const {UserId} = req.params
    const userInfo = db.users.find((userInfo) =>
        userInfo.UserId == UserId    
    )
   
    if(userInfo){
        res.status(201).json(userInfo)
    } else {
     res.status(404).json({
        data : {
            message : "User not found!"
        }
     })
    }
})

app.put("/updateUser/:UserId",(req,res) => {
  const {UserId} = req.params
  const {Name, Age, City} = req.body
  const userInfo = db.users.find((userInfo) =>
        userInfo.UserId == UserId    
    )
    if(userInfo){
        userInfo.Name = Name;
        userInfo.Age = Age;
        userInfo.City = City;
        
        res.status(201).json({
            data : {
                message : "user details updated!"
            }
        })
    } else {
        res.status(404).json({
           data : {
               message : "User not found!"
           }
        })
       }
  
})

app.delete("/deleteUser/:UserId",(req,res) => {
  const {UserId} = req.params
  const userInfo = db.users.find((userInfo) => 
        userInfo.UserId == UserId 
  )

  if(!userInfo){
    res.status(404).json({
        data : {
            message : "User not found!"
        }
    })
  }

  const index = db.users.indexOf(userInfo)
  db.users.splice(index,1)

  res.status(201).json({
    data : {
        message : "User deleted!"
    }
  })

})


app.listen(3000,() => {
    console.log("The  server is running on the port 3000");
})
