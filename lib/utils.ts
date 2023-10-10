import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function setCookieAsync(token:string){
  return new Promise((resolve,reject)=>{
    Cookies.set('authCookie',token, { expires: 30 })
    resolve(null)
  })
}


export function trimSentence(input: string,number:number){
  const words = input.split(' ');
  const wordLength = number
  if (words.length <= wordLength) {
      return input;
  }

  const trimmedWords = words.slice(0, number);
  return trimmedWords.join(' ') + ' ...';
}


//calculate minute read based on length of blog
export function calculateReadingTime(text: string): string {

  const wordsPerMinute = 180;
  const wordCount = text.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  return `${readingTimeMinutes} min read`;
}


export const textToHtml = (text:string)=>{
  //add line breaks on spaced caused by enter
  const htmlstring = text.replace(/(\s{2,})/g,"<br/>")
  //wrap the entire text in a div tag
  return `<div>${htmlstring}</div>`
}