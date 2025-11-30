
# Learnings
- In Dev mode React StrictMode causes useEffect to run twice on mount. This can lead to duplicate API calls if not handled properly. In prod this will not happen
- Declaring of function is must with access specifier (let,const , var)
- 

# Store Initialiation order

    - Create a store file and use configureStore method to create a store
    - Crete Slices files and use createSlice to create a new Slice of the store
    - Add action and reducers in the slice and export both
    - in Store configure each slice reducers to link the slice to the store

    - useDispatch - hook for trigerring actions of slice
    - useSelector - hook for reading state of the slice. 