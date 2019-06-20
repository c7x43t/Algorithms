fn binary_search_range<T>(vec: &[T], value: T, mut start : usize, mut end: usize) -> Result<usize, usize> where T: PartialOrd,{
    let mut index : usize;
    while start < end {
        index = (start + end - 1) >> 1;
        if value < vec[index]{
            start = index + 1;
        }else if value < vec[index]{
            end = index;
        }else{
            Ok(index);
        }
    }
    if vec[index] < value {
        Err(index + 1)
    } else {
        Err(index)
    }
}
