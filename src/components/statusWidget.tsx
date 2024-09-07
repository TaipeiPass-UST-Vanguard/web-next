import CommodityStatus from "@/module/commodity/domain/commodityStatus";

const StatusWidget = ({ status }:{status:string}) => {
  switch (status) {
    case CommodityStatus.draft:
      return (
        <div className={`inline-flex items-center py-0.5 px-3 rounded-full bg-gray-100`}>
          <div className={`w-2.5 h-2.5 rounded-full mr-2 bg-gray-700`}></div>
          <span className="text-black font-bold text-sm">草稿</span>
        </div>
      );
    case CommodityStatus.giving:
      return (
        <div className={`inline-flex items-center py-0.5 px-3 rounded-full bg-orange-100`}>
          <div className={`w-2.5 h-2.5 rounded-full mr-2 bg-orange-500`}></div>
          <span className="text-black font-bold text-sm">放置貨品</span>
        </div>
      );
    case CommodityStatus.giveExpired:
      return (
        <div className={`inline-flex items-center py-0.5 px-3 rounded-full bg-gray-100`}>
          <div className={`w-2.5 h-2.5 rounded-full mr-2 bg-gray-700`}></div>
          <span className="text-black font-bold text-sm">已過期</span>
        </div>
      );
    case CommodityStatus.pending:
      return (
        <div className={`inline-flex items-center py-0.5 px-3 rounded-full bg-gray-100`}>
          <div className={`w-2.5 h-2.5 rounded-full mr-2 bg-blue-700`}></div>
          <span className="text-black font-bold text-sm">訂單進行中</span>
        </div>
      );
    case CommodityStatus.receiving:
      return (
        <div className={`inline-flex items-center py-0.5 px-3 rounded-full bg-green-100`}>
          <div className={`w-2.5 h-2.5 rounded-full mr-2 bg-green-500`}></div>
          <span className="text-black font-bold text-sm">等待接收</span>
        </div>
      );
    case CommodityStatus.expired:
      return(
        <div className={`inline-flex items-center py-0.5 px-3 rounded-full bg-gray-100`}>
          <div className={`w-2.5 h-2.5 rounded-full mr-2 bg-gray-700`}></div>
          <span className="text-black font-bold text-sm">待清除</span>
        </div>
      );
    default:
      return(
        <div className={`inline-flex items-center py-0.5 px-3 rounded-full 'bg-gray-100'`}>
          <div className={`w-2.5 h-2.5 rounded-full mr-2 bg-gray-700`}></div>
          <span className="text-black font-bold text-sm">unknown</span>
        </div>
      );
  } 
};

export default StatusWidget;
