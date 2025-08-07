export default function SideText({icon, text}) {
  return (
    <div className="flex w-[180px] py-2 px-4 rounded-md cursor-pointer gap-3 hover:bg-[#F2F2F2]">
          {icon}
          <p className="text-[16px]">{text}</p>
        </div>
  )
}
