import React from 'react';
import '../styles/Button.css';

class TelevideoButton extends React.Component {
  render() {
    return (
      <div className="televideo-button-group">
        <a
          href="https://us02web.zoom.us/j/3276258888?pwd=KzdlTWZudDlvWmRaeFZ0bW51czdKdz09"
          target="_blank"
          rel="noopener noreferrer"
          className="active item"
        >
          <svg
            className="button"
            viewBox="0 0 16 18"
            width="16"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_1">
              <g>
                <path d="M9.79098 17.9428C9.05395 17.8318 7.79666 17.3749 7.44982 17.0877C7.37033 17.0225 7.26917 16.9702 7.21859 16.9702C7.16801 16.9702 7.11743 16.9441 7.10298 16.918C7.09575 16.8919 6.93678 16.7679 6.75614 16.6439C6.35872 16.3632 5.3471 15.456 5.07975 15.1296C4.97136 14.9991 4.8413 14.8555 4.78349 14.8033C4.73291 14.7576 4.53781 14.5291 4.34994 14.2942C4.15484 14.0592 3.95252 13.8177 3.89472 13.7524C3.83691 13.6937 3.79355 13.6154 3.79355 13.5827C3.79355 13.5501 3.74297 13.4913 3.68517 13.4456C3.62013 13.4 3.51897 13.2629 3.46117 13.1454C3.39613 13.0214 3.31665 12.9235 3.28052 12.9235C3.24439 12.9235 3.21549 12.8909 3.21549 12.8517C3.21549 12.8125 3.15768 12.7016 3.0782 12.6102C3.00594 12.5123 2.87588 12.3295 2.79639 12.199C2.48568 11.6964 2.45678 11.6507 2.41342 11.6181C2.35562 11.5659 0.975485 9.04644 0.975485 8.98117C0.975485 8.95506 0.93213 8.83758 0.874324 8.72662C0.686453 8.34805 0.390194 7.54523 0.195097 6.886C0.0289033 6.31162 0.00722582 6.10276 0 5.18898C0 3.96842 0.079484 3.61597 0.556388 2.70871C0.823743 2.18655 1.35123 1.57301 2.00155 1.00516C2.83252 0.280662 3.36723 0 3.92362 0C4.37162 0 4.58839 0.228446 5.15923 1.25971C5.44104 1.77535 5.67227 2.21918 5.67227 2.24529C5.67227 2.26487 5.7373 2.40847 5.80956 2.56512C5.88904 2.71524 6.05523 3.11991 6.1853 3.45932C6.46711 4.19034 6.50324 4.67987 6.29369 4.88873C6.14194 5.03886 5.78065 5.22161 5.62169 5.22161C5.5711 5.22161 5.46994 5.24772 5.39769 5.28688C5.33265 5.31952 5.02194 5.4109 4.71123 5.48922C4.08981 5.65239 3.82968 5.83515 3.77188 6.15497C3.72852 6.45522 4.05368 7.53217 4.40775 8.25667C4.84852 9.14435 5.5133 10.3062 5.80233 10.6978C5.87459 10.7892 5.97575 10.9458 6.03356 11.0502C6.08414 11.1481 6.1564 11.2265 6.19253 11.2265C6.22143 11.2265 6.25033 11.2656 6.25033 11.3113C6.25033 11.3635 6.31536 11.4549 6.39485 11.5202C6.47433 11.5855 6.53936 11.6638 6.53936 11.6899C6.53936 11.8008 7.41369 12.7734 7.95562 13.2759C8.38195 13.6676 8.57704 13.772 8.89498 13.772C9.22737 13.772 9.33576 13.7067 10.1017 13.054C10.5425 12.6755 11.0266 12.4013 11.2506 12.4013C11.3229 12.4013 11.4746 12.4405 11.583 12.4927C11.7853 12.5906 12.4356 13.1846 12.768 13.5892C12.8764 13.7198 13.0065 13.8634 13.0571 13.9156C13.2305 14.0853 13.5918 14.5226 13.9097 14.9469C14.0831 15.1818 14.2421 15.3842 14.271 15.4038C14.2927 15.4233 14.4011 15.5996 14.5094 15.7888C14.8563 16.4285 14.7334 16.8332 14.0903 17.1856C12.9414 17.8187 11.1205 18.1386 9.79098 17.9428Z" />
                <path d="M14.9863 11.8922L14.7551 11.7095L14.8491 10.9066C14.9719 9.82316 14.8346 8.62871 14.4878 7.63661C14.3071 7.13403 13.4906 5.61323 13.3967 5.61323C13.3605 5.61323 13.3316 5.5806 13.3316 5.54144C13.3316 5.2673 11.2578 3.39405 10.9471 3.39405C10.9038 3.39405 10.8749 3.36794 10.8749 3.3353C10.8749 3.27656 9.30686 2.54554 9.17679 2.54554C9.0684 2.53901 8.73602 2.26487 8.68543 2.13433C8.6204 1.97116 8.74324 1.72313 8.96002 1.59259C9.11898 1.49469 9.19124 1.49469 9.45137 1.55996C9.84157 1.66439 10.752 2.06254 11.1422 2.29751C11.3084 2.39541 11.4746 2.48027 11.5107 2.48027C11.5541 2.48027 11.5974 2.50637 11.6119 2.53248C11.6263 2.56512 11.7853 2.67608 11.966 2.78704C12.3851 3.04812 13.7146 4.24909 14.0036 4.63418C14.1265 4.79736 14.2493 4.94095 14.2854 4.94748C14.3143 4.96053 14.3432 4.99969 14.3432 5.03886C14.3432 5.07149 14.4083 5.18898 14.495 5.29341C14.7045 5.56102 15.1814 6.40953 15.2826 6.70324C15.3332 6.84031 15.3982 6.98391 15.4271 7.01654C15.4849 7.08834 15.5211 7.19277 15.7162 7.89769C15.9618 8.75273 16.0269 9.35974 15.9907 10.4628C15.9546 11.6181 15.8751 11.8922 15.5283 12.0097C15.2682 12.1011 15.2393 12.0946 14.9863 11.8922Z" />
                <path d="M12.8692 11.4157C12.6813 11.2852 12.6813 11.2852 12.6885 10.3584C12.6958 9.37932 12.6741 9.19656 12.4573 8.43943C12.1755 7.46038 11.489 6.40953 10.6798 5.71114C10.1739 5.27383 9.50917 4.82999 9.36466 4.82999C9.3213 4.82999 9.28517 4.81041 9.28517 4.77777C9.28517 4.73861 9.13343 4.66681 8.63485 4.47753C8.28801 4.35352 8.12904 4.17076 8.12904 3.90968C8.12904 3.62249 8.32414 3.45932 8.67098 3.45932C8.94556 3.45932 10.0294 3.94884 10.5714 4.31436C10.976 4.58849 12.1755 5.62629 12.1755 5.70461C12.1755 5.72419 12.2839 5.87431 12.414 6.03096C12.703 6.37037 13.2594 7.38205 13.4617 7.93032C13.7652 8.75273 13.9025 9.81663 13.8085 10.7108C13.7652 11.109 13.7218 11.2395 13.5773 11.3766C13.3605 11.5855 13.1293 11.5985 12.8692 11.4157Z" />
                <path d="M10.8749 10.985C10.6003 10.8805 10.5569 10.7565 10.5063 9.96022C10.4702 9.43806 10.398 9.03339 10.304 8.77883C10.1161 8.29583 9.86324 7.83242 9.77653 7.83242C9.74763 7.83242 9.71872 7.79325 9.71872 7.74104C9.71872 7.62355 8.6493 6.65755 8.51924 6.65755C8.46143 6.65755 8.41808 6.63145 8.41808 6.60534C8.41808 6.5727 8.26634 6.4748 8.07846 6.38995C7.60879 6.18108 7.55098 6.11581 7.55098 5.8482C7.55098 5.60018 7.81111 5.35215 8.07124 5.35215C8.30969 5.35215 8.96724 5.67198 9.3213 5.95264C9.43692 6.05707 9.55976 6.13539 9.59589 6.13539C9.66814 6.13539 10.2968 6.70324 10.2968 6.76851C10.2968 6.80115 10.3907 6.91211 10.4991 7.01654C10.7737 7.28415 11.2867 8.21098 11.4457 8.7462C11.7058 9.58166 11.7275 10.5738 11.4963 10.8479C11.3951 10.9719 11.0483 11.0502 10.8749 10.985Z" />
              </g>
            </g>
          </svg>
        </a>
      </div>
    );
  }
}

export default TelevideoButton;