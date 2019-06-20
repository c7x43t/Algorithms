fn interject_2_vectors2<'a, T>(a: &'a [T],b: &'a [T]) -> Vec<&'a T> where T: PartialOrd,{
    let mut result = Vec::new();
    let mut i  = 0;
    let mut j  = 0;
    let a_len= a.len();
    let b_len = b.len();
    let mut number_of_hits : usize = 0;
    let mut ratio : usize = 2;
    let mut index : Result<usize,usize>;
    let mut index_start : usize;
    let mut index_end : usize;
    while i < a_len && j < b_len {
        if &a[i] == &b[j]{
            result.push(&a[i]);
            i+=1;
            j+=1;
            number_of_hits+=1;
            ratio = j/number_of_hits;
        } else if &a[i] < &b[j] {
            while i < a_len && &a[i] < &b[j] {
                i+=1;
            }
        } else {
            while j < b_len && &b[j] < &a[i] {
                j+=ratio;
            }
            if j>=b_len && j-ratio+1 < b_len {
                j=b_len-1;
            }
            index_start=j-ratio+1;
            index_end=j;
            index = binary_search_range(&b, &a[i], index_start, index_end);
            match index {
                Ok(idx) => {
                    result.push(&a[i]);
                    i+=1;
                    j=idx+1;
                    number_of_hits+=1;
                    ratio = j/number_of_hits;
                },
                Err(_) => {
                    i+=1;
                    j = j - ratio + 1;
                },
            }
        }
    }
    return result;
}
fn interject_2_vectors<'a, T>(a: &'a [T],b: &'a [T]) -> Vec<&'a T> where T: PartialOrd,{
    let mut result = Vec::new();
    let mut i  = 0;
    let mut j  = 0;
    let mut tmp : usize;
    let a_len= a.len();
    let b_len = b.len();
    //println!("{}{}", "a_len", a_len);
    //println!("{}{}", "b_len", b_len);
    let ratio = usize::max(b_len / a_len - 1, 2);
    //println!("{}{}", "ratio", ratio);
    let mut index : Result<usize, usize>;
    let mut index_start : usize;
    let mut index_end : usize;
    //println!("{}", ratio);
    match ratio {
        1 => {
            //println!("{}", "entered 1");
            while i < a_len {
                //println!("{}{}", "i",i);
                //println!("{}{}", "j",j);
                if &a[i] == &b[j]{
                    result.push(&a[i]);
                    i+=1;
                    j+=1;  
                } else if &a[i] < &b[j] {
                    while i < a_len && &a[i] < &b[j] {
                        i+=1;
                    }
                } else {
                    while j < b_len && &b[j] < &a[i] {
                        j+=1;
                    }
                    if j >= b_len {
                        break;
                    }
                }
            }
        }
        2 => {
            //println!("{}", "entered 2");
            while i < a_len {
                if &a[i] == &b[j]{
                    result.push(&a[i]);
                    i+=1;
                    j+=1;  
                } else if &a[i] < &b[j] {
                    while i < a_len && &a[i] < &b[j] {
                        i+=1;
                    }
                } else {
                    while j < b_len && &b[j] < &a[i] {
                        j+=2;
                    }
                    if j >= b_len {
                        break;
                    }
                    if &a[i] <= &b[j-1] {
                        j-=1;
                    }
                }
            }
        }
        _ => {
            //println!("{}", "entered n");
            while i < a_len {
                //println!("{}", i);
                //println!("{}", j);
                if &a[i] == &b[j]{
                    result.push(&a[i]);
                    i+=1;
                    j+=1;  
                } else if &a[i] < &b[j] {
                    while i < a_len && &a[i] < &b[j] {
                        i+=1;
                    }
                } else {
                    while j < b_len && &b[j] < &a[i] {
                        j+=ratio;
                    }
                    index_start = j - ratio + 1;
                    if j + 1  < b_len{
                        index_end = j + 1;
                    } else {
                        index_end = b_len - 1;
                    }
                    //println!("{}{}", "index_start",index_start);
                    //println!("{}{}", "index_end",index_end);
                    //println!("{}", "entered binary_search");
                    index = binary_search_range(&b, &a[i], index_start, index_end);
                    // println!("{}", "exited binary_search");
                    match index {
                        Ok(idx) => {
                            result.push(&a[i]);
                            i+=1;
                            j = idx + 1;
                        },
                        Err(_) => {
                            i+=1;
                            j = j - ratio + 1;
                        },
                    }
                    if j >= b_len {
                        break;
                    }
                   
                }
            }
        }
    }
    //println!("{}", "return result");
    return result;
}
