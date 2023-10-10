export interface IUser{
    id: number,
    image: string,
    firstName: string,
    lastName: string,
    email: string
}

export interface IgoogleLogInResponse{
    email:string,
    id: string
}

export interface IgoogleResponse extends IgoogleLogInResponse{
    family_name: string
    given_name: string
    picture:string
}


export interface ISignInRequest {
    image: string,
    firstName: string,
    lastName: string,
    username:string,
    password:string
}

export interface ISignInresponse{
    token:string
    user:IUser
}

export interface IComment{
    user:IUser
    createdAt:string
    comment:string
    id:number
}
export interface ICategory{
    id:number
    name:string
}

export interface IBlog{
    createdAt:string
    id:number
    category:ICategory
    isLiked:boolean
    likeCount:number
    post_comment:IComment[]
    slug:string
    image:string
    author:IUser
    title:string
    text:string
    html:string
    updatedAt:string
}

export interface IBlogResponse{
    blog:IBlog[]
    // profile:IUser | false
}
export interface ILikeResponse{
    blog:IBlog
}

export interface IBlogDetailResponse{
    blog:IBlog
    related:IBlog[]
}

export interface IResponse{
    public_id:string
 }

 export interface ICreatePost{
    image:string,
    text:string,
    html:string,
    title:string,
    selected_category:string
}


export interface IvalidateNewBlog{
    text:string
    image:string
}

export interface ICreateorEditBlog {
    image: string;
    text: string;
    html: string;
    title: string;
    selected_category: string;
    slug?: string; 
  }