fn intersect_vectors<T>(vecs: &Vec<Vec<T>>)-> Vec<T> where T: PartialOrd,{
    const len : usize = vecs.len();
    let mut shortest : usize = 0;
    for i in 1..len {
        if vecs[i].len() < vecs[shortest].len() {
            shortest=i;
        }
    }
    let mut result : Vec<T> = vecs[shortest];
    for i in 0..len {
        if i != shortest{
            result = intersect_2_vectors(&result, &vecs[i]);
        }
    }
    return result;
}
fn intersect_2_vectors<'a, T>(a: &'a [T],b: &'a [T]) -> Vec<&'a T> where T: PartialOrd,{
    let mut result = Vec::new();
    let mut i  = 0;
    let mut j  = 0;
    const a_len : usize = a.len();
    const b_len : usize = b.len();
    loop {
        if &a[i] == &b[j] {
            result.push(&a[i]);
            i+=1;
            j+=1;
            if i == a_len || j == b_len {
                break;
            }
        } else if &a[i] < &b[j] {
            while i < a_len && &a[i] < &b[j] {
                i+=2;
            }
            if i -1 >= a_len {
                break;
            }
            if &a[i-1] >= &b[j] {
                i-=1;
            }
        } else { // &a[i] > &b[j]
            while j < b_len && &a[i] > &b[j] {
                j+=2;
            }
            if j -1 >= b_len {
                break;
            }
            if &a[i] <= &b[j-1] {
                j-=1;
            }
        }
    }
    return result;
}
