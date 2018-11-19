const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLNonNull,
    GraphQLID, GraphQLList } = graphql;
const createRetro = require('../modal/createretro');



    const addcreateretro = new GraphQLObjectType({
        name : 'createretro',
        fields : () => ({
            id : { type : GraphQLID},
            useruid : {type : GraphQLID},
            projectname : {type : new GraphQLNonNull(GraphQLString)},
            sprintnumber : {type : new GraphQLNonNull(GraphQLString)},
            templatename : {type : new GraphQLNonNull(GraphQLString)},
            retrocategory1 : {type : new GraphQLNonNull(GraphQLString)},
            retrocategory2 : {type : new GraphQLNonNull(GraphQLString)},
            retrocategory3 : {type : new GraphQLNonNull(GraphQLString)},
            retrocategory4 : {type : new GraphQLNonNull(GraphQLString)},

        })
    })

    const findretro = new GraphQLObjectType({
        name :'findretro',
        fields : () => ({

            id : { type : GraphQLID},
            useruid : {type : GraphQLID},
            projectname : {type : new GraphQLNonNull(GraphQLString)},
            sprintnumber : {type : new GraphQLNonNull(GraphQLString)},
            templatename : {type : new GraphQLNonNull(GraphQLString)},
            retrocategory1 : {type : new GraphQLNonNull(GraphQLString)},
            retrocategory2 : {type : new GraphQLNonNull(GraphQLString)},
            retrocategory3 : {type : new GraphQLNonNull(GraphQLString)},
            retrocategory4 : {type : new GraphQLNonNull(GraphQLString)},
        })
        })

    const Rootquery = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            findretro:{
                type: addcreateretro,
                args: {
                    useruid : { type: GraphQLID }
                },
                resolve(parent,args){
                    return createRetro.findById({"_id" : args.useruid});
                }
            },
        //     signin: {
        //         type: createUser,
        //         args: {
        //             Email: { type: GraphQLString },
        //             Pass: { type: GraphQLID }
        //         },
        //         resolve(parent, args) {
        //             return mlabsignup.findOne({ "Email": args.Email, "Pass": args.Pass });
    
        //         }
        //     },
        }
    });


    //Mutation means edit ,delete or add the data
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        createretro :{
            type : addcreateretro,
            args :{ 
                useruid : {type : new GraphQLNonNull(GraphQLString)},
                projectname : { type: new GraphQLNonNull(GraphQLString)},
                sprintnumber : { type: new GraphQLNonNull(GraphQLString)},
                templatename : { type: new GraphQLNonNull(GraphQLString)},
                retrocategory1 : { type: new GraphQLNonNull(GraphQLString)},
                retrocategory2 : { type: new GraphQLNonNull(GraphQLString)},
                retrocategory3 : { type: new GraphQLNonNull(GraphQLString)},
                retrocategory4 : { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                let data = new createRetro({
                    useruid : args.useruid,
                    projectname : args.projectname,
                    sprintnumber : args.sprintnumber,
                    templatename : args.templatename,
                    retrocategory1 : args.retrocategory1,
                    retrocategory2 : args.retrocategory2,
                    retrocategory3 : args.retrocategory3,
                    retrocategory4 : args.retrocategory4
                })
                return data.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Rootquery,
    mutation: Mutation
})