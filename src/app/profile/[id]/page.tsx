export default function UserProfilePage({ params }: any) {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">
        <span className="text-bold text-blue-400">{params.id} </span>- User
        Profile Page
      </h1>
    </div>
  );
}
