const Avatar = ({ username, userId , online}) => {
    const colors = ['bg-red-200', 'bg-green-200', 'bg-purple-200', 'bg-blue-200',
        'bg-yellow-200', 'bg-teal-200']
    const userIdBase10 = parseInt(userId, 16);
    const colorIndex = userIdBase10 % colors.length;
    const color = colors[colorIndex];
    // console.log('user id ', userId)
    // console.log('userIdBase10 % colors.length', userIdBase10 % colors.length);
    // console.log('color', colors[colorIndex]);
    // console.log('.............................')
    return (
        <div className={`w-8 h-8 rounded-full flex items-center relative ${color}`}>
            <div className="w-full text-center text-gray-800">{username[0]}</div>
           {online ? (
             <div className="absolute right-0 bottom-0 bg-green-400 w-3 h-3 border
            rounded-full border-white"></div>
           ) : (
            <div className="absolute right-0 bottom-0 bg-gray-400 w-3 h-3 border
            rounded-full border-white"></div>
           )}
        </div>
    )
}

export default Avatar