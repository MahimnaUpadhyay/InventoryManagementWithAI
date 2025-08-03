import React from 'react'

const Todo = () => {
    return (
        <>
            <div className="flex flex-col w-full h-auto bg-gray-100 justify-center items-center rounded-md p-5">
                <div className="w-full p-5 bg-white rounded-lg shadow-lg">
                    <ul>
                        <li>
                            <input type="checkbox" id="mail" name="mail" value="mail" className="mr-2"/> Check Mail
                        </li>
                        <li>
                            <input type="checkbox" id="mail" name="mail" value="mail" className="mr-2"/> Check Stocks
                        </li>
                        <li>
                            <input type="checkbox" id="mail" name="mail" value="mail" className="mr-2"/> Check Sales
                        </li>
                        <li>
                            <input type="checkbox" id="mail" name="mail" value="mail" className="mr-2"/> Check Products
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Todo