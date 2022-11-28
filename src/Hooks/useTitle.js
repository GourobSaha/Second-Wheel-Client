import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Second Wheel`;
    }, [title])
};

export default useTitle;