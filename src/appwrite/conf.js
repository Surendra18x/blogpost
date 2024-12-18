import config from "../config/config";
import { Client,Databases,Query,Storage,ID } from "appwrite";

export class DataService{
    client = new Client();
    storage;
    databases;

    
constructor(){
    this.client
    .setEndpoint(config.appwriteUrl) 
    .setProject(config.appwriteProjectId); 

    this.storage = new Storage(this.client)
    this.databases = new Databases(this.client)
}

async createPost({title,content,slug,status,featuredImage,userId}){
    try {
        return await this.databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        )
    } catch (error) {
        console.log("DataService :: createpost :: error ",error)
    }
}

async updatePost({title,slug,content,featuredImage,status}){
    try {
        return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
        )
    } catch (error) {
        console.log("DataService :: updatePost :: error ",error)
    }
}

async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        ) 
        return true;
    } catch (error) {
        console.log("DataService :: deletePost :: error ", error)
        return false;
    }
}

async getPost(slug){
    console.log("slug recieved ===> ", slug)
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("DataService :: getpost :: error ",error)
        return false;
    }
}

async getPosts(queries = [Query.equal("status","active")] ){
    try {
        return await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries
        )
    } catch (error) {
        console.log("DataServices :: getPosts :: error ",error)
        return false;
    }
}

// file upload service

async uploadFile(file){
    
    try {
        
        return await this.storage.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file,
        )
    } catch (error) {
        console.log("DataService :: uploadFile :: error ",error)
        return false
    }
}

async deleteFile(fileId){
    try {
        return await this.storage.deleteFile(
            config.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {
        console.log("DataService :: deleteFile :: error ",error)
        return false
    }
}

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId,
        )
    
    
}

}

const dataService = new DataService();

export default dataService;