import Resolutions from './resolutions';
import Goals from '../goals/goals'
export default {
  Query: {
    resolutions(obj, args, { userId }){
      console.log(userId)
      return Resolutions.find({
        userId
      }).fetch();
    }
  },
  
  Resolution: {
    goals: resolution => Goals.find({
      resolutionId: resolution._id
    }).fetch()
  },
  
  Mutation: {
    createResolution(obj, { name }, {userId}){
      console.log(name)
       const resolutionId = Resolutions.insert({
         name,
         userId
       });
       return Resolutions.findOne(resolutionId)
    }
  }
};