import { useContext, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { blogListActions } from "@/store/blogSlice";
import { IBlog } from "@/interfaces/interface";
import { pageSize } from "@/utils/constants";



export const blogSlicedArray = (array:IBlog[],start:number,end:number)=>{
    const newarray = [...array]
    return newarray.slice(start,end)
  }

const range = (start:number, end:number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};



export const usePagination = () => {
    const [paginationRange,setPaginationRange] = useState<(string|number)[] | null>(null)
    const {page,blogs} = useAppSelector((state=>state.bloglist))
    const dispatch = useAppDispatch()
    const siblingCount = 1
    const totalCount = blogs.length
    const DOTS = ""
    const isbackDisabled = Math.ceil(blogs.length / pageSize) === page
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    useEffect(()=>{
        handleChange({currentPage:1})
      },[totalPageCount])

    //sets current page to passed in Number
    const handleChange = ({currentPage}:{currentPage:number}) => {
      dispatch(blogListActions.setBlogsInView(currentPage))

      //retursn less than 7 todos if array length is less than 7
      if (totalPageNumbers >= totalPageCount) {
        console.log(totalPageCount)
        return setPaginationRange(range(1, totalPageCount));
      }
      
      //Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPageCount
      );
  
      //We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits 
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
  
      const firstPageIndex = 1;
      const lastPageIndex = totalPageCount;
  
      // no No left dots to show, but rights dots to be shown
      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 1 + 2 * siblingCount;
        let leftRange = range(1, leftItemCount);
        return setPaginationRange([...leftRange, DOTS, totalPageCount-2,totalPageCount-1,totalPageCount])
      }

      //no right dots is shown
     if (shouldShowLeftDots && !shouldShowRightDots) {
         let rightItemCount = 3 + 2 * siblingCount;
         let rightRange = range(
           totalPageCount - rightItemCount + 1,
           totalPageCount
         );
         return setPaginationRange([firstPageIndex, DOTS, ...rightRange]);
       }

       //left and right dot is shown

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            console.log("out4")
            return setPaginationRange([firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]);
          }
        };
      

    return {paginationRange,handleChange,page,isbackDisabled};
};
      
  