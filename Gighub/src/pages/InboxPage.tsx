import { FunctionComponent, useMemo, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Inbox,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import {
  messages,
  notifications,
  useGigHubStore,
} from "../store/useGigHubStore";
import styles from "./InboxPage.module.css";

const InboxPage: FunctionComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab =
    searchParams.get("tab") === "messages" ? "messages" : "notifications";
  const [selectedMessageId, setSelectedMessageId] = useState(messages[0].id);
  const [query, setQuery] = useState("");
  const readNotificationIds = useGigHubStore(
    (state) => state.readNotificationIds,
  );
  const markNotificationRead = useGigHubStore(
    (state) => state.markNotificationRead,
  );
  const markAllNotificationsRead = useGigHubStore(
    (state) => state.markAllNotificationsRead,
  );
  const showToast = useGigHubStore((state) => state.showToast);

  const filteredNotifications = useMemo(
    () =>
      notifications.filter((notification) =>
        [notification.title, notification.body]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  const filteredMessages = useMemo(
    () =>
      messages.filter((message) =>
        [message.name, message.preview, message.role]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  const selectedMessage =
    messages.find((message) => message.id === selectedMessageId) || messages[0];
  const unreadCount = notifications.filter(
    (notification) => !readNotificationIds.includes(notification.id),
  ).length;

  const iconForType = (type: string) => {
    if (type === "offer") return <CircleDollarSign size={18} />;
    if (type === "message") return <MessageCircle size={18} />;
    if (type === "brief") return <FileText size={18} />;
    return <Sparkles size={18} />;
  };

  return (
    <AppLayout className={styles.page}>
      <main className={styles.content}>
        <div className={styles.pageHeading}>
          <div>
            <span className={styles.kicker}>Your workspace</span>
            <h1>Notifications & messages</h1>
            <p>
              Keep up with offers, conversations, and the little moments that
              move your projects forward.
            </p>
          </div>
          <div className={styles.headingIcon}>
            <Bell size={24} />
          </div>
        </div>
        <div className={styles.toolbar}>
          <div className={styles.tabs} role="tablist">
            <button
              className={activeTab === "notifications" ? styles.activeTab : ""}
              onClick={() => setSearchParams({ tab: "notifications" })}
              role="tab"
              aria-selected={activeTab === "notifications"}
            >
              <Bell size={16} /> Notifications <span>{unreadCount}</span>
            </button>
            <button
              className={activeTab === "messages" ? styles.activeTab : ""}
              onClick={() => setSearchParams({ tab: "messages" })}
              role="tab"
              aria-selected={activeTab === "messages"}
            >
              <Mail size={16} /> Messages{" "}
              <span>{messages.filter((message) => message.unread).length}</span>
            </button>
          </div>
          <div className={styles.search}>
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${activeTab}`}
              aria-label={`Search ${activeTab}`}
            />
          </div>
          {activeTab === "notifications" && (
            <button
              className={styles.markButton}
              onClick={markAllNotificationsRead}
            >
              <CheckCheck size={15} /> Mark all read
            </button>
          )}
        </div>

        {activeTab === "notifications" ? (
          <section
            className={styles.notificationPanel}
            aria-label="Notifications list"
          >
            <div className={styles.panelHeader}>
              <div>
                <h2>Recent activity</h2>
                <span>
                  {unreadCount
                    ? `${unreadCount} updates need your attention`
                    : "You’re all caught up"}
                </span>
              </div>
              <button
                aria-label="More notification options"
                onClick={() =>
                  showToast("Notification preferences are coming soon")
                }
              >
                <MoreHorizontal size={19} />
              </button>
            </div>
            <div className={styles.notificationList}>
              {filteredNotifications.map((notification) => {
                const isRead = readNotificationIds.includes(notification.id);
                return (
                  <button
                    key={notification.id}
                    className={[
                      styles.notificationRow,
                      !isRead ? styles.unreadRow : "",
                    ].join(" ")}
                    onClick={() => {
                      markNotificationRead(notification.id);
                      showToast("Notification marked as read");
                    }}
                  >
                    <span
                      className={[
                        styles.typeIcon,
                        styles[`type-${notification.type}`],
                      ].join(" ")}
                    >
                      {iconForType(notification.type)}
                    </span>
                    {notification.avatar ? (
                      <img
                        className={styles.notificationAvatar}
                        src={notification.avatar}
                        alt=""
                      />
                    ) : (
                      <span className={styles.gigHubAvatar}>
                        <Sparkles size={15} />
                      </span>
                    )}
                    <span className={styles.notificationCopy}>
                      <strong>{notification.title}</strong>
                      <span>{notification.body}</span>
                      <small>{notification.time}</small>
                    </span>
                    {!isRead && (
                      <span className={styles.unreadDot} aria-label="Unread" />
                    )}
                    <ChevronRight className={styles.rowArrow} size={17} />
                  </button>
                );
              })}
            </div>
            {filteredNotifications.length === 0 && (
              <div className={styles.emptyState}>
                <Inbox size={27} />
                <strong>No notifications match that search</strong>
                <span>Try a different phrase.</span>
              </div>
            )}
          </section>
        ) : (
          <section className={styles.messageLayout} aria-label="Messages list">
            <div className={styles.messageList}>
              <div className={styles.panelHeader}>
                <div>
                  <h2>Inbox</h2>
                  <span>Conversations with your creative partners</span>
                </div>
                <button
                  aria-label="Compose message"
                  onClick={() =>
                    showToast("Start a conversation from any gig page")
                  }
                >
                  <MessageCircle size={18} />
                </button>
              </div>
              {filteredMessages.map((message) => (
                <button
                  key={message.id}
                  className={[
                    styles.messageRow,
                    selectedMessageId === message.id
                      ? styles.selectedMessage
                      : "",
                  ].join(" ")}
                  onClick={() => setSelectedMessageId(message.id)}
                >
                  <img src={message.avatar} alt="" />
                  <span>
                    <strong>{message.name}</strong>
                    <small>{message.role}</small>
                    <span>{message.preview}</span>
                  </span>
                  <time>{message.time}</time>
                  {message.unread && <i />}
                </button>
              ))}
            </div>
            <div className={styles.conversation}>
              <div className={styles.conversationHeader}>
                <div>
                  <span className={styles.kicker}>Conversation</span>
                  <h2>{selectedMessage.name}</h2>
                  <small>
                    {selectedMessage.role} · Usually replies in a few hours
                  </small>
                </div>
                <button
                  aria-label="More conversation options"
                  onClick={() =>
                    showToast("Conversation options are coming soon")
                  }
                >
                  <MoreHorizontal size={19} />
                </button>
              </div>
              <div className={styles.conversationBody}>
                <div className={styles.dateDivider}>
                  <span>Today</span>
                </div>
                <div className={[styles.bubble, styles.incoming].join(" ")}>
                  <img src={selectedMessage.avatar} alt="" />
                  <div>
                    <p>{selectedMessage.preview}</p>
                    <small>{selectedMessage.time}</small>
                  </div>
                </div>
                <div className={[styles.bubble, styles.outgoing].join(" ")}>
                  <div>
                    <p>
                      Thanks, {selectedMessage.name.split(" ")[0]} — I’ll review
                      this and get back to you shortly.
                    </p>
                    <small>
                      Just now <Check size={12} />
                    </small>
                  </div>
                </div>
                <div className={styles.replyHint}>
                  <Star size={15} /> Keep the conversation moving with clear
                  feedback and a next step.
                </div>
              </div>
              <form
                className={styles.replyBox}
                onSubmit={(event) => {
                  event.preventDefault();
                  showToast(`Message sent to ${selectedMessage.name}`);
                }}
              >
                <input
                  placeholder={`Reply to ${selectedMessage.name}…`}
                  aria-label={`Reply to ${selectedMessage.name}`}
                />
                <button type="submit" aria-label="Send message">
                  <Mail size={16} />
                </button>
              </form>
            </div>
          </section>
        )}
        <div className={styles.bottomLinks}>
          <Link to="/">← Back to discover</Link>
          <button
            onClick={() =>
              showToast("Notification preferences are coming soon")
            }
          >
            Notification preferences <ChevronRight size={14} />
          </button>
        </div>
      </main>
    </AppLayout>
  );
};

export default InboxPage;
